<?php
require '../includes/db_query.php';
// list of functions
// (1)  set_auth_cookie - sets the auth cookie using a passed string which is series_id:raw_token
// (2)  store_sess_cookie - stores the cookie both in the database and in the browser
// (3)  rotate_cookie - rotates the cookie by deleting the old one and creating a new one in both
//                       the database and the browser

function set_auth_cookie(string $cookie_value): void
{
    $cookie_life = time() + COOKIE_LIFETIME;

    setcookie(
        SESS_COOKIE,
        $cookie_value,
        $cookie_life,
        '/',                // accessible to whole site
        '.localsketch.xyz', // subdomains included
        true,               // secure
        true                // httponly
    );

}

function store_sess_cookie($conn, int $user_id): void
{
    // 1) generate tokens to be used and all other variables
    $raw_token = bin2hex(random_bytes(32));
    $series_id = bin2hex(random_bytes(32));

    $token_hash = hash('sha256', $raw_token);

    $expiration_time_db = date('Y-m-d H:i:s', time() + COOKIE_LIFETIME);
    $user_agent         = $_SERVER['HTTP_USER_AGENT'] ?? '';

    $cookie_value = $series_id . ':' . $raw_token;

    // 2) store the tokens in th database
    $sql = "INSERT INTO user_sessions (user_id, series_id, token_hash, user_agent, expires_at)
        VALUES (:user_id, :series_id, :token_hash, :user_agent, :expires_at)";

    $params = [
        'user_id'    => $user_id,
        'series_id'  => $series_id,
        'token_hash' => $token_hash,
        'user_agent' => $user_agent,
        'expires_at' => $expiration_time_db,
    ];

    try {
        db_query($conn, $sql, $params, 'INSERT');
    } catch (Exception $e) {
        throw new Exception("Error Processing Request", 1);

    }

    // 3) store the cookie now
    set_auth_cookie($cookie_value);

}

function rotate_cookie($conn, string $series_id): void
{
    // 1) generate new tokens and other variables
    $new_series_id = bin2hex(random_bytes(32));
    $new_raw_token = bin2hex(random_bytes(32));

    $new_hash_token = hash('sha256', $new_raw_token);

    $expiration_time_db = date('Y-m-d H:i:s', time() + COOKIE_LIFETIME);

    $sql    = "UPDATE user_sessions SET token_hash = :new_token, series_id = :new_series, expires_at = :new_expire WHERE series_id = :old_series_id";
    $params = [
        'new_token'     => $new_hash_token,
        'new_series'    => $new_series_id,
        'new_expire'    => $expiration_time_db,
        'old_series_id' => $series_id,
    ];

    try {
        db_query($conn, $sql, $params, 'UPDATE');
    } catch (Exception $e) {
        throw new Exception("Error Processing Request", 1);
    }

    // 2) update the cookie value and expiration
    set_auth_cookie($new_series_id . ':' . $new_raw_token);
}

function get_logged_user(): string
{
    // this has to be for both authenticated and non authenticated users
}
