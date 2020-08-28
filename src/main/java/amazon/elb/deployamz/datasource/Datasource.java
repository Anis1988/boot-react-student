package amazon.elb.deployamz.datasource;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Datasource {

    @Bean
    @ConfigurationProperties("app.datasource") // app. data source refer to the file inside of yml
    public HikariDataSource hikariDataSource () {
        return DataSourceBuilder
                .create()
                .type(HikariDataSource.class)
                 // after her you can define password and user name but no need to since we have that in our yml
                .build();
    }
}
