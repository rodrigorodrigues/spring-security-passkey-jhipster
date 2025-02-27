package com.github.jhipster.passkey.webauthn;

import java.util.List;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.web.webauthn.api.Bytes;
import org.springframework.security.web.webauthn.api.CredentialRecord;
import org.springframework.security.web.webauthn.management.UserCredentialRepository;
import org.springframework.stereotype.Repository;

@Primary
@Repository
public interface AppCredentialsRecordRepository extends UserCredentialRepository, JpaRepository<AppCredentialsRecord, byte[]> {
    List<CredentialRecord> findAllByUserEntityUserId(byte[] userId);

    AppCredentialsRecord save(AppCredentialsRecord record);

    @Override
    default List<CredentialRecord> findByUserId(Bytes userId) {
        return this.findAllByUserEntityUserId(userId.getBytes());
    }

    @Override
    default CredentialRecord findByCredentialId(Bytes credentialId) {
        return this.findById(credentialId.getBytes()).orElse(null);
    }

    @Override
    default void save(CredentialRecord credentialRecord) {
        this.save(AppCredentialsRecord.fromCredentialRecord(credentialRecord));
    }

    @Override
    default void delete(Bytes credentialId) {
        this.deleteById(credentialId.getBytes());
    }
}
