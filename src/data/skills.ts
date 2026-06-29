import type { SkillRow } from "../types";

export const SKILLS: SkillRow[] = [
  {
    label: "Languages",
    items: [
      { name: "Java", icon: "/assets/icons/java.svg" },
      { name: "Kotlin", icon: "/assets/icons/kotlin.svg" },
      { name: "Python", icon: "/assets/icons/python.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
      { name: "HTML", icon: "/assets/icons/html5.svg" },
      { name: "CSS", icon: "/assets/icons/css3.svg" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "Spring Boot", icon: "/assets/icons/spring.svg" },
      { name: "Spring Security", icon: "/assets/icons/spring-security.png" },
      { name: "Hibernate", icon: "/assets/icons/hibernate.svg" },
      { name: "Android", icon: "/assets/icons/android.svg" },
    ],
  },
  {
    label: "Data & Messaging",
    items: [
      { name: "PostgreSQL", icon: null },
      { name: "MySQL", icon: "/assets/icons/mysql.svg" },
      { name: "Elasticsearch", icon: "/assets/icons/elasticsearch.svg" },
      { name: "RabbitMQ", icon: "/assets/icons/rabbitmq.svg" },
      { name: "gRPC", icon: "/assets/icons/grpc.svg" },
      { name: "Apache Spark", icon: null },
    ],
  },
  {
    label: "Cloud & Tools",
    items: [
      { name: "AWS", icon: "/assets/icons/aws.svg" },
      { name: "GCP", icon: "/assets/icons/gcp.svg" },
      { name: "Firebase", icon: "/assets/icons/firebase.svg" },
      { name: "Docker", icon: "/assets/icons/docker.svg" },
      { name: "Git", icon: "/assets/icons/git.svg" },
    ],
  },
];
