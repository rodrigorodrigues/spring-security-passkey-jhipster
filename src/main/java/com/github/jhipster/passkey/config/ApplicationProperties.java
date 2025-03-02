package com.github.jhipster.passkey.config;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Jhipster Passkey.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link tech.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties implements InitializingBean {

    private final Liquibase liquibase = new Liquibase();

    private final WebAuthn webAuthn = new WebAuthn();

    // jhipster-needle-application-properties-property

    public Liquibase getLiquibase() {
        return liquibase;
    }

    public WebAuthn getWebAuthn() {
        return webAuthn;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        WebAuthn webAuthn = getWebAuthn();
        if (webAuthn.getRpName() == null) {
            webAuthn.setRpName("Spring Security Relying Party");
        }
        if (webAuthn.getRpId() == null) {
            webAuthn.setRpId("localhost");
        }
        if (webAuthn.getAllowedOrigins() == null) {
            webAuthn.setAllowedOrigins(new String[] { "http://localhost:8080", "http://localhost:9000", "https://spendingbetter.com" });
        }
    }

    // jhipster-needle-application-properties-property-getter

    public static class Liquibase {

        private Boolean asyncStart = true;

        public Boolean getAsyncStart() {
            return asyncStart;
        }

        public void setAsyncStart(Boolean asyncStart) {
            this.asyncStart = asyncStart;
        }
    }

    // jhipster-needle-application-properties-property-class

    public static class WebAuthn {

        private String rpName;
        private String rpId;
        private String[] allowedOrigins;

        public String getRpName() {
            return rpName;
        }

        public void setRpName(String rpName) {
            this.rpName = rpName;
        }

        public String getRpId() {
            return rpId;
        }

        public void setRpId(String rpId) {
            this.rpId = rpId;
        }

        public String[] getAllowedOrigins() {
            return allowedOrigins;
        }

        public void setAllowedOrigins(String[] allowedOrigins) {
            this.allowedOrigins = allowedOrigins;
        }
    }
}
