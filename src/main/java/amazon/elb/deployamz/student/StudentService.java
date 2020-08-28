package amazon.elb.deployamz.student;


import amazon.elb.deployamz.EmailValidatore;
import amazon.elb.deployamz.exception.ApiRequestException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;
    private final EmailValidatore emailValidatore;

    public StudentService(StudentDataAccessService studentDataAccessService, EmailValidatore emailValidatore) {
        this.studentDataAccessService = studentDataAccessService;
        this.emailValidatore = emailValidatore;
    }

    public List<Student> getALlStudents() {
      return studentDataAccessService.selectAllStudents();
    }

     void addNewStudent(Student student) {
        addNewStudent(null,student);
    }
     void addNewStudent(UUID studentId,Student student) {
         UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

         if(!emailValidatore.test(student.getEmail())){

             throw new ApiRequestException(student.getEmail() + " is not Valid");
         }
         if(studentDataAccessService.isEmailTaken(student.getEmail())){

             throw new ApiRequestException(student.getEmail() + " is taken");

         }
         studentDataAccessService.insertStudent(newStudentId,student);
     }

    public List<StudentCourse> getAllCoursesStudent(UUID studentId) {
        return studentDataAccessService.selectAllStudentsCourses(studentId);
    }
    public void deleteStd(UUID studentId) {
        studentDataAccessService.deletePerson(studentId);
    }

    public void updateStudent(UUID studentId, Student student) {
        Optional.ofNullable(student.getEmail())
                .ifPresent(email -> {
                    boolean taken = studentDataAccessService.selectExistsEmail(studentId, email);
                    if (!taken) {
                        studentDataAccessService.updateEmail(studentId, email);
                    } else {
                        throw new IllegalStateException("Email already in use: " + student.getEmail());
                    }
                });

        Optional.ofNullable(student.getFirstName())
                .filter(fistName -> !StringUtils.isEmpty(fistName))
                .map(StringUtils::capitalize)
                .ifPresent(firstName -> studentDataAccessService.updateFirstName(studentId, firstName));

        Optional.ofNullable(student.getLastName())
                .filter(lastName -> !StringUtils.isEmpty(lastName))
                .map(StringUtils::capitalize)
                .ifPresent(lastName -> studentDataAccessService.updateLastName(studentId, lastName));
    }
}
