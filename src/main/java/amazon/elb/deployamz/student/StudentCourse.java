package amazon.elb.deployamz.student;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.UUID;



public class StudentCourse {
    private final UUID studentId;
    private final UUID courseId;
    private final String name;
    private final String description;
    private final String departement;
    private final String teacherName;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final Integer grade;

    public StudentCourse(@JsonProperty("student_id") UUID studentId,
                         @JsonProperty("course_id")UUID courseId,
                         @JsonProperty("name")String name,
                         @JsonProperty("description")String description,
                         @JsonProperty("departement")String departement,
                         @JsonProperty("teacher_name")String teacherName,
                         @JsonProperty("start_date")LocalDate startDate,
                         @JsonProperty("end_date")LocalDate endDate,
                         @JsonProperty("grade")Integer grade) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.name = name;
        this.description = description;
        this.departement = departement;
        this.teacherName = teacherName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.grade = grade;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getDepartement() {
        return departement;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Integer getGrade() {
        return grade;
    }
}

