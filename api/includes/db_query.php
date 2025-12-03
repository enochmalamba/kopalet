<?php

function db_query($conn, string $sql, array $params, string $operation = "SELECT")
{
    $stmt = $conn->prepare($sql);

    if (! $stmt->execute($params)) {
        error_log("SQL query failed: " . $stmt->errroInfor()[2]);
        return false;
    }
    if (stripos($operation, "SELECT") === 0) {
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } elseif (stripos($operation, "INSERT") === 0) {
        return $conn->lastInsertId();
    }
    return true;
}
