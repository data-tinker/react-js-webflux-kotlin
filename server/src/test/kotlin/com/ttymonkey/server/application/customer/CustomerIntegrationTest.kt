package com.ttymonkey.server.application.customer

import com.ttymonkey.server.AppIntegrationTest
import com.ttymonkey.server.domain.Customer
import com.ttymonkey.server.domain.CustomerRepository
import com.ttymonkey.server.helper.CustomerHelper
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.test.web.reactive.server.expectBodyList
import java.net.http.HttpHeaders

internal class CustomerIntegrationTest(@Autowired private val customerRepository: CustomerRepository) :
    AppIntegrationTest() {

    @Test
    fun `Given a customer when tries to fetch data from customers API without AUTHORIZATION header then receives an UNAUTHORIZED error`() {
        webTestClient
            .get().uri("/v1/customers")
            .exchange()
            .expectStatus().isUnauthorized
    }

    @Test
    fun `Given a customer when tries to fetch data from customers API with AUTHORIZATION header but without starting with Bearer then receives an UNAUTHORIZED error`() {
        webTestClient
            .get().uri("/v1/customers")
            .header(HttpHeaders.AUTHORIZATION, accessToken().replace("Bearer ", ""))
            .exchange()
            .expectStatus().isUnauthorized
    }

    @Test
    fun `Given a customer when tries to fetch data from customers API with AUTHORIZATION header but with a not compliant Bearer token then receives an UNAUTHORIZED error`() {
        webTestClient
            .get().uri("/v1/customers")
            .header(HttpHeaders.AUTHORIZATION, "Bearer test")
            .exchange()
            .expectStatus().isUnauthorized
    }

    @Test
    fun `Given a customer when tries to fetch data from customers API with AUTHORIZATION then receives the data`() {
        runBlocking {
            val customer = CustomerHelper.random()

            customerRepository.save(customer)

            webTestClient
                .get().uri("/v1/customers")
                .header(HttpHeaders.AUTHORIZATION, accessToken())
                .exchange()
                .expectStatus().isOk
                .expectBodyList<Customer>()
                .contains(customer)
        }
    }
}
