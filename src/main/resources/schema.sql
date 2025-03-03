--- Spring Security JDBC DDL
-- Passkeys DDL
CREATE TABLE IF NOT EXISTS public_key_user
(
    id           BYTEA UNIQUE NOT NULL,
    name         TEXT         NOT NULL,
    display_name TEXT
);

CREATE TABLE IF NOT EXISTS credentials_record
(
    -- foreign key
    user_entity_user_id         BYTEA        NOT NULL,

    -- display
    label                       TEXT         NOT NULL,
    last_used                   TIMESTAMP,
    created                     TIMESTAMP,

    -- contains all the authenticator data
    attestation_object          BYTEA        NOT NULL,
    credential_id               BYTEA UNIQUE NOT NULL,

    -- security feature
    signature_count             INT          NOT NULL,

    uv_initialized              BOOLEAN,
    backup_eligible             BOOLEAN,
    backup_state                BOOLEAN,
    attestation_client_datajson BYTEA        NOT NULL,
    public_key_cose             BYTEA        NOT NULL,
    transports                  TEXT
);
