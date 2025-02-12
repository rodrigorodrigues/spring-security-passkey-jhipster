package com.github.jhipster.passkey;

import com.github.jhipster.passkey.config.AsyncSyncConfiguration;
import com.github.jhipster.passkey.config.EmbeddedRedis;
import com.github.jhipster.passkey.config.EmbeddedSQL;
import com.github.jhipster.passkey.config.JacksonConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { JhipsterPasskeyApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class })
@EmbeddedRedis
@EmbeddedSQL
public @interface IntegrationTest {
}
