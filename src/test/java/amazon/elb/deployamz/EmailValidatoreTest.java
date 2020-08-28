package amazon.elb.deployamz;


import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmailValidatoreTest {

    private final EmailValidatore underTest = new EmailValidatore();

    @Test
    void itShouldValidateEmail() {
        // Given
        assertThat(underTest.test("hello@gmail.com")).isTrue();
        // When
        // Then
    }

    @Test
    void itShouldNotValidate() {
        // Given
        assertThat(underTest.test("hello@gmailm")).isFalse();

        // When
        // Then
    }

}