import type { CalendarData, SchoolEvent } from "../types";

// Mock data for events
export const mockEvents: SchoolEvent[] = [
  {
    id: "1",
    title: "Term 1 Begins",
    date: "2024-01-15T00:00:00Z",
    type: "academic",
    description: "Start of the first term for the new academic year.",
  },
  {
    id: "2",
    title: "Parent-Teacher Meeting",
    date: "2024-02-10T15:00:00Z",
    type: "meeting",
    description: "Quarterly parent-teacher conference to discuss student progress.",
  },
  {
    id: "3",
    title: "Inter-Class Debate Competition",
    date: "2024-02-28T09:00:00Z",
    type: "activity",
    description: "Students showcase speaking and research skills in a debate showdown.",
  },
  {
    id: "4",
    title: "Mid-Term Examinations",
    date: "2024-03-18T00:00:00Z",
    type: "exam",
    description: "First semester examinations covering all core subjects.",
  },
  {
    id: "5",
    title: "Science Fair",
    date: "2024-04-05T09:00:00Z",
    type: "activity",
    description: "Students present science projects to parents and community partners.",
  },
  {
    id: "6",
    title: "Sports Day",
    date: "2024-05-20T07:00:00Z",
    type: "activity",
    description: "Annual athletics and games competition for the whole school.",
  },
  {
    id: "7",
    title: "Career Awareness Week",
    date: "2024-06-12T08:30:00Z",
    type: "academic",
    description: "Guest speakers and workshops helping pupils explore future careers.",
  },
  {
    id: "8",
    title: "Cultural Heritage Festival",
    date: "2024-07-02T10:00:00Z",
    type: "activity",
    description: "Celebration of Tanzanian culture with performances and exhibitions.",
  },
  {
    id: "9",
    title: "Mock National Examinations",
    date: "2024-08-19T00:00:00Z",
    type: "exam",
    description: "Preparation assessments ahead of national examinations.",
  },
  {
    id: "10",
    title: "Community Service Day",
    date: "2024-09-14T07:30:00Z",
    type: "activity",
    description: "Students engage in service projects across the Tanga community.",
  },
  {
    id: "11",
    title: "Parent Literacy Workshop",
    date: "2024-10-05T09:00:00Z",
    type: "meeting",
    description: "Workshop equipping parents with strategies to support reading at home.",
  },
  {
    id: "12",
    title: "Final Examinations",
    date: "2024-11-18T00:00:00Z",
    type: "exam",
    description: "Comprehensive end-of-year examinations for all classes.",
  },
  {
    id: "13",
    title: "Graduation & Awards Ceremony",
    date: "2024-12-06T14:00:00Z",
    type: "activity",
    description: "Celebrating graduating pupils and outstanding achievements.",
  },
];

// Mock news articles
export const mockNews = [
  {
    id: "1",
    title: "Amani School Achieves 95% Pass Rate in National Exams",
    excerpt: "Our students demonstrate exceptional performance in this year's national examinations.",
    content:
      "We are proud to announce that Amani English Medium Pre and Primary School has achieved a 95% pass rate in this year's national examinations. This outstanding result reflects the dedication of our teachers and the hard work of our students. The success spans across all grade levels, with particular excellence in Mathematics and Science.",
    date: "2024-01-10T00:00:00Z",
    author: "Principal Dr. Joseph Mwangi",
    category: "achievement",
    imageUrl: "/images/news/exam-success.jpg",
  },
  {
    id: "2",
    title: "New STEM Laboratory Officially Opened",
    excerpt: "State-of-the-art facilities enhance hands-on learning experiences.",
    content:
      "Our newly renovated STEM laboratory was officially opened this week. Equipped with modern computers, microscopes, and laboratory equipment, the space provides students with opportunities for practical, inquiry-based learning. The facility supports our commitment to 21st-century education.",
    date: "2024-01-05T00:00:00Z",
    author: "Facilities Manager",
    category: "facilities",
    imageUrl: "/images/news/stem-lab.jpg",
  },
  {
    id: "3",
    title: "Student Leadership Camp Builds Future Leaders",
    excerpt: "Selected students participate in week-long development program.",
    content:
      "Twenty students participated in our annual leadership development camp this January. Through workshops, team-building activities, and mentorship sessions, participants developed critical leadership skills. The program focuses on character development, public speaking, and community service.",
    date: "2023-12-28T00:00:00Z",
    author: "Head of Student Affairs",
    category: "student-life",
    imageUrl: "/images/news/leadership-camp.jpg",
  },
];

// Mock performance data
export const mockPerformance = {
  summary: {
    passRate: 95,
    averageScore: 82,
    graduationRate: 98,
    studentSatisfaction: 96,
  },
  bySubject: [
    { subject: "Mathematics", passRate: 92, averageScore: 85 },
    { subject: "English Language", passRate: 96, averageScore: 84 },
    { subject: "Science", passRate: 94, averageScore: 83 },
    { subject: "Social Studies", passRate: 96, averageScore: 81 },
    { subject: "Physical Education", passRate: 98, averageScore: 88 },
  ],
  achievements: [
    "Top 5 performing school in Tanga region (2023)",
    "Highest pass rate in Science category",
    "Winner of Inter-School Debate Championship 2023",
    "Excellence in Sports (3 regional medals)",
    "Award for Best Facilities in East Africa",
  ],
  yearOverYear: [
    { year: 2021, passRate: 87 },
    { year: 2022, passRate: 91 },
    { year: 2023, passRate: 95 },
  ],
};

// Mock calendar data
export const generateCalendarData = (): CalendarData => {
  return {
    year: 2024,
    events: mockEvents.map((event) => ({
      ...event,
      date: new Date(event.date).toISOString(),
    })),
  };
};
