// import { Injectable } from '@nestjs/common';
// import { Week } from '../entities/week.entity';
// import { Subject } from '../entities/subject.entity';
// import { SubjectType } from '../common/enums/subject-type.enum';

// @Injectable()
// export class ScheduleValidatorService {
//   validateWeekSchedule(week: Week): string[] {
//     const warnings: string[] = [];

//     // Check for multiple exams in the same week
//     const hasPartialExam = week.subjects.some(
//       (s) => s.type === SubjectType.PARTIAL_EXAM,
//     );
//     const hasFinalExam = week.subjects.some(
//       (s) => s.type === SubjectType.FINAL_EXAM,
//     );

//     if (hasPartialExam && hasFinalExam) {
//       warnings.push('Warning: Week contains both partial and final exams');
//     }

//     // Check conference hours limit (20% monthly)
//     const conferenceHours = week.subjects
//       .filter((s) => s.type === SubjectType.CONFERENCE)
//       .reduce((total, subject) => total + subject.totalHours, 0);

//     const monthlyLimit =
//       week.subjects.reduce((total, subject) => total + subject.totalHours, 0) *
//       0.2;

//     if (conferenceHours > monthlyLimit) {
//       warnings.push(
//         'Warning: Conference hours exceed 20% of total monthly hours',
//       );
//     }

//     return warnings;
//   }
// }
