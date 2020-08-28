CREATE TYPE gender AS ENUM ('MALE','FEMALE');

ALTER TABLE student
    ALTER COLUMN gender TYPE gender
        USING (gender::gender); -- we are doing this because we already have content in our table so we need to cast existing values
