package com.ttymonkey.server.application.security.authentication

import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.reactor.mono
import org.springframework.http.HttpStatus
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.server.WebFilterExchange
import org.springframework.security.web.server.authentication.ServerAuthenticationFailureHandler
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class JWTServerAuthenticationFailureHandler : ServerAuthenticationFailureHandler {
    override fun onAuthenticationFailure(
        webFilterExchange: WebFilterExchange?,
        exception: AuthenticationException?,
    ): Mono<Void> = mono {
        val exchange =
            webFilterExchange?.exchange ?: throw com.ttymonkey.server.application.HttpExceptionFactory.unauthorized()
        exchange.response.statusCode = HttpStatus.UNAUTHORIZED
        exchange.response.setComplete().awaitFirstOrNull()
    }
}
