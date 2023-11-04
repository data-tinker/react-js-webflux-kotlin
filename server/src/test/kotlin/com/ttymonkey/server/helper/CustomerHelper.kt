package com.ttymonkey.server.helper

import com.ttymonkey.server.domain.Customer
import java.util.UUID

object CustomerHelper {

    fun random() = Customer(
        UUID.randomUUID().toString(),
        UUID.randomUUID().toString() + "@example.com",
        UUID.randomUUID().toString(),
    )
}
