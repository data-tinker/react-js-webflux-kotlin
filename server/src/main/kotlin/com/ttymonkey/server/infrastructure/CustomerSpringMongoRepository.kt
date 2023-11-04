package com.ttymonkey.server.infrastructure

import com.ttymonkey.server.domain.Customer
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Mono

interface CustomerSpringMongoRepository : ReactiveMongoRepository<Customer, String> {
    fun findCustomerByEmail(email: String): Mono<Customer>
}
