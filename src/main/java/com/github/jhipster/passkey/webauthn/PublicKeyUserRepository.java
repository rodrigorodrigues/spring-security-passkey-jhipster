package com.github.jhipster.passkey.webauthn;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.web.webauthn.api.Bytes;
import org.springframework.security.web.webauthn.api.PublicKeyCredentialUserEntity;
import org.springframework.security.web.webauthn.management.PublicKeyCredentialUserEntityRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicKeyUserRepository
    extends PublicKeyCredentialUserEntityRepository, JpaRepository<AppPublicKeyCredentialUserEntity, byte[]> {
    Optional<AppPublicKeyCredentialUserEntity> findByName(String name);

    /**
     * Required to make the JPA method visible in
     * {@link #save(PublicKeyCredentialUserEntity)}.
     * @param userEntity must not be {@literal null}.
     * @return -
     */
    AppPublicKeyCredentialUserEntity save(AppPublicKeyCredentialUserEntity userEntity);

    @Override
    default void save(PublicKeyCredentialUserEntity userEntity) {
        AppPublicKeyCredentialUserEntity x = AppPublicKeyCredentialUserEntity.fromPublicKeyUserEntity(userEntity);
        this.save(x);
    }

    @Override
    default void delete(Bytes id) {
        deleteById(id.getBytes());
    }

    @Override
    default PublicKeyCredentialUserEntity findByUsername(String username) {
        return findByName(username).orElse(null);
    }

    @Override
    default PublicKeyCredentialUserEntity findById(Bytes id) {
        return findById(id.getBytes()).orElse(null);
    }
}
