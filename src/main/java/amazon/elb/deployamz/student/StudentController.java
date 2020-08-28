package amazon.elb.deployamz.student;


import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudent() {
//         throw new ApiRequestException("Oops cannot get the student's list ");
        return studentService.getALlStudents();
    }
    @GetMapping("/{studentId}/courses")
    public List<StudentCourse> getAllCoursesForStudent (@PathVariable("studentId") UUID studentId) {
        System.out.println(studentId);

        return studentService.getAllCoursesStudent(studentId);
    }

    @PostMapping
    public void addNewStudent (@RequestBody @Valid Student student) {
        studentService.addNewStudent(null,student);
    }
    @DeleteMapping("/{studentId}")
    public void deleteStudent(@PathVariable UUID studentId) {
        studentService.deleteStd(studentId);
    }
    @PutMapping ("/{studentId}")
    public void editStudent(@PathVariable UUID studentId, @RequestBody Student student) {
        studentService.updateStudent(studentId,student);
    }

}
