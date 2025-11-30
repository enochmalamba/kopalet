<?php

require "../config.php";
require "../includes/db_query.php";

// helper functions for registering
function random_avatar(string $initial): string
{
    return "https://avatar.iran.liara.run/username?username=" . $initial;
}

//user data to be registered
$reg_data = json_decode(file_get_contents("php://input"));

$name        = $reg_data->name ?? null;
$email       = $reg_data->email ?? null;
$password    = $reg_data->password ?? null;
$is_verified = 0;

if (empty($name)) {
    $name = explode('@', $email)[0]; // use the email as the username
}
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    return;
}

// default profile data for new users
$bio         = "Hey there, I'm using Kopalet!";
$avatar      = random_avatar($name[0]);
$cover_photo = null;

try {

    //start trans
    $conn->beginTransaction();

    //check if email already exists before anything
    $check_email = db_query($conn, "SELECT * FROM app_users WHERE email = ?", [$email]);
    if (! empty($check_email)) {
        $conn->rollBack();
        http_response_code(200);
        echo json_encode(
            ["success" => false, "message" => "Email exists"]
        );
        return;
    }
    // hash password using password default for storage
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $register_stmt   = "INSERT INTO app_users (username,email, password_hash, is_verified) VALUES (:username, :email, :password, :is_verified)";
    $register_params = [
        "username"    => $name,
        "email"       => $email,
        "password"    => $hashedPassword,
        "is_verified" => $is_verified,
    ];

    $regi_query = db_query($conn, $register_stmt, $register_params, "INSERT");

    if (! $regi_query) {
        $conn->rollBack();
        http_response_code(200);
        echo json_encode(
            ["success" => false, "message" => "Failed to create account, try again later"]
        );
        return;
    }

    // if the data has successfully been added into app_users, make entried in the profile table
    $user_id        = $regi_query;
    $profile_stmt   = "INSERT INTO user_profiles (user_id, bio, avatar, cover_photo) VALUES (:user_id, :bio, :avatar, :cover_photo)";
    $profile_params = [
        "user_id"     => $user_id,
        "bio"         => $bio,
        "avatar"      => $avatar,
        "cover_photo" => $cover_photo,
    ];

    $profile_query = db_query($conn, $profile_stmt, $profile_params, "INSERT");
    if (! $profile_query) {
        $conn->rollBack();
        http_response_code(200);
        echo json_encode(
            ["success" => false, "message" => "Failed to create account, try again later"]
        );
        return;
    }

    $conn->commit();
    http_response_code(200);
    echo json_encode(
        [
            "success" => true,
            "message" => "Account created successfully",
            "user_id" => $user_id,
        ]
    );
    return;

} catch (\Throwable $th) {
    http_response_code(200);
    echo json_encode(
        ["success" => false, "message" => "Failed to create account, try again later"]
    );
    return;
}
