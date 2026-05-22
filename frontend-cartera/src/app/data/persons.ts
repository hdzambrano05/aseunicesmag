// src/models/persons.ts

import {
  Crown,
  BadgeCheck,
  BriefcaseBusiness,
  Landmark,
  Users,
} from "lucide-react";

export interface Persona {
  id: string;
  nombre: string;
  cargo: string;
  area: string;
  foto: string;
  icono?: any;
  perfil?: {
    formacion: string[];
    experiencia: string[];
  };
}

export const persons: Persona[] = [
  {
    id: "presidenta",
    nombre: "Sandra Rocio Guerrero Torres",
    cargo: "Presidenta",
    area: "Junta Directiva",
    foto: "/landing/person/c1.png",
    icono: Crown,
    perfil: {
      formacion: [
        "Ingeniería de Sistemas, I.U. CESMAG",
        "Psicóloga",
        "Esp. Gerencia Social",
        "Esp. en Psicología Jurídica y Forense",
        "Mg. Resolución de Conflictos y Mediación",
        "Mg. Gerencia Estratégica",
        "Doctorante en Psicología con énfasis en Psicología Jurídica y Forense",
      ],
      experiencia: [
        "Secretaria de Junta Directiva (2014–2016)",
        "Presidenta de Junta Directiva (2016–2018)",
        "Fiscal de Junta Directiva (2021–2023)",
        "Más de 15 años de experiencia como docente universitaria",
        "Representante del Colegio Colombiano de Psicólogos (ColPsic)",
        "Ponente y panelista en espacios académicos y sociales",
        "Directora General y cofundadora de Okabled S.A.S.",
      ],
    },
  },

  {
    id: "vicepresidenta",
    nombre: "Eliana Sofía Díaz Acosta",
    cargo: "Vicepresidenta",
    area: "Junta Directiva",
    foto: "/landing/person/c2.png",
    icono: BadgeCheck,
    perfil: {
      formacion: ["Licenciada en Educación Preescolar – I.U. CESMAG"],
      experiencia: [
        "Vocal de Junta Directiva apoyando labores secretariales (2024–2025)",
        "Más de 12 años de experiencia docente",
        "Experiencia en jardines infantiles e institutos técnicos",
        "Participación en cursos y congresos de educación infantil",
        "Emprendedora y líder del Restaurante Mar y Tierra",
      ],
    },
  },

  {
    id: "tesoreria",
    nombre: "Leydi Johanna Gelpud Guaquez",
    cargo: "Tesorera",
    area: "Junta Directiva",
    foto: "/landing/person/c3.png",
    icono: BriefcaseBusiness,
    perfil: {
      formacion: [
        "Contaduría Pública – I.U. CESMAG",
        "Especialización en Gerencia Tributaria – Universidad Mariana",
      ],
      experiencia: [
        "Tesorera de Junta Directiva (2021–2024)",
        "Contadora pública en Centro Comercial San Agustín P.H.",
        "Contador público en Mopasoft S.A.S.",
        "Asistente administrativa y contable",
        "Auxiliar contable en empresas de Pasto",
        "Práctica profesional en la OPI de la I.U. CESMAG",
      ],
    },
  },

  {
    id: "secretaria",
    nombre: "Myrian del Socorro Ruiz Calvache",
    cargo: "Secretaria",
    area: "Junta Directiva",
    foto: "/landing/person/c4.png",
    icono: Landmark,
    perfil: {
      formacion: [
        "Tecnóloga en Educación Preescolar",
        "Licenciada en Educación Preescolar y promoción de la familia",
        "Especialista en Administración Educativa",
        "Magister en Educación desde la Diversidad",
      ],
      experiencia: [
        "Más de 27 años de experiencia docente",
        "Secretaria de Junta Directiva (2021–2023)",
        "Docente en Instituto Champagnat",
        "Coordinadora del programa Proniño",
        "Subdirectora Pedagógica – Fundación Proinco",
        "Docente en Universidad CESMAG",
        "Coordinadora de práctica pedagógica",
        "Docente investigadora y Coordinadora de Maestría",
      ],
    },
  },

  {
    id: "vocal",
    nombre: "Oscar Andrés Delgado Mejía",
    cargo: "Vocal",
    area: "Junta Directiva",
    foto: "/landing/person/c5.png",
    icono: Users,
    perfil: {
      formacion: [
        "Tecnólogo en Sistemas – I.U. CESMAG",
        "Ingeniero de Sistemas – I.U. CESMAG",
        "Tecnólogo en Contabilidad y Finanzas – SENA",
      ],
      experiencia: [
        "Asociado fundador de ASEUNICESMAG",
        "Experiencia en Monitoreo de Sistemas y Gestión Bibliotecaria",
        "Más de 12 años de experiencia en el sector financiero",
        "Área administrativa en Banco Mundo Mujer",
      ],
    },
  },

  {
    id: "administracion",
    nombre: "Yigda Clodett López Marroquín",
    cargo: "Directora General",
    area: "Administración",
    foto: "/landing/person/c6.jpg",
    perfil: {
      formacion: [
        "Administración Financiera – I.U. CESMAG",
        "Contaduría Pública – UNIREMINGTON",
        "Especialista en Gerencia de Proyectos",
        "Certificación Empresaria Digital – MinTIC",
      ],
      experiencia: [
        "Vocal de Junta Directiva (2016-2018)",
        "Presidenta de Junta Directiva (2021-2023)",
        "Ponente en Red Colombiana de Posgrados",
        "Coautora del Estudio de Caracterización de Egresados",
        "Experiencia en Planeación y Proyección Institucional",
        "Consultora freelance en fortalecimiento organizacional",
        "Directora Administrativa y Financiera de Okabled S.A.S.",
      ],
    },
  },

  {
    id: "revisor",
    nombre: "Camilo Esteban Muñoz Benavides",
    cargo: "Revisor Fiscal",
    area: "Control",
    foto: "/landing/person/c8.png",
    perfil: {
      formacion: [
        "Contador Público – Universidad CESMAG",
        "Especialista en Revisoría Fiscal y Contraloría",
        "Formación complementaria en auditoría y calidad",
      ],
      experiencia: [
        "Experiencia en auditoría y control interno",
        "Trabajo en Universidad CESMAG",
        "Trabajo en Coemprender E.S.P.",
        "Trabajo en Transipiales S.A.",
        "Trabajo en Dulces del Sur",
        "Asesorías contables a entidades públicas",
        "Manejo de SIIGO y SIIGO Pyme",
      ],
    },
  },

  // PERSONAS SIN PORTAFOLIO
  {
    id: "nicole",
    nombre: "Nicole Kahoru Mora Jojoa",
    cargo: "Auxiliar Administrativo y Contable",
    area: "Área Administrativa y Financiera",
    foto: "/landing/person/c7.png",
  },

  {
    id: "cristian",
    nombre: "Cristian Camilo Hurtado Jiménez",
    cargo: "Community Manager y Gestión Digital",
    area: "Sistemas y Comunicaciones",
    foto: "/landing/person/c9.jpeg",
  },

  {
    id: "fernando",
    nombre: "Fernando Jose Yampuesan Narvaez",
    cargo: "Desarrollo y Soporte de Sistemas",
    area: "Sistemas y Comunicaciones",
    foto: "/landing/person/c10.jpeg",
  },

  {
    id: "kilian",
    nombre: "Kilian Felipe Córdoba Rivera",
    cargo: "Diseñador Gráfico y Apoyo en Comunicaciones",
    area: "Sistemas y Comunicaciones",
    foto: "/landing/person/c11.png",
  },
];
