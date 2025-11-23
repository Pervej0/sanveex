import {
  Brain,
  Eye,
  Heart,
  Microscope,
  Droplet,
  Bone,
  SquareBottomDashedScissors,
  LucideParkingSquare,
} from "lucide-react";

interface Department {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const departments: Department[] = [
  {
    icon: <Brain className="h-10 w-10" />,
    title: "Psychiatry",
    description:
      "Our Psychiatry Department focuses on mental, emotional, and behavioral health. We provide comprehensive diagnostic evaluations, psychotherapy, medication management, addiction treatment, and crisis intervention. Our team of psychiatrists, clinical psychologists, and therapists work collaboratively to support individuals dealing with depression, anxiety disorders, bipolar disorder, trauma, schizophrenia, and other mental health conditions. With patient-centered care and advanced treatment plans, we promote long-term mental well-being and recovery.",
  },
  {
    icon: <Eye className="h-10 w-10" />,
    title: "Ophthalmology",
    description:
      "The Ophthalmology Department is dedicated to the diagnosis and treatment of eye and vision-related disorders. We offer advanced services including cataract surgery, glaucoma treatment, corneal disease care, retina services, laser vision correction, pediatric eye care, and cosmetic eye procedures. Our mission is to enhance quality of life through cutting-edge technology and individualized care, helping patients preserve and restore vision with precision and expertise.",
  },
  {
    icon: <Heart className="h-10 w-10" />,
    title: "Cardiology",
    description:
      "Our Cardiology Department is a regional cardiac referral center offering comprehensive heart care. We provide specialized services in preventive cardiology, interventional cardiology, electrophysiology, heart failure management, cardiac screening, and rehabilitation. With state-of-the-art diagnostic tools such as echocardiography, angiography, Holter monitoring, and stress testing, we diagnose and manage coronary artery disease, arrhythmias, hypertension, congenital heart conditions, and more. Our heart experts work to deliver life-saving treatments with compassion and precision.",
  },
  {
    icon: <Microscope className="h-10 w-10" />,
    title: "Immunology",
    description:
      "The Immunology Department focuses on disorders involving the immune system. We diagnose and treat autoimmune diseases, allergies, immunodeficiencies, inflammatory conditions, and hypersensitivity reactions. Our services include allergy testing, immunotherapy, autoimmune disease management, vaccine consultations, and treatment for chronic immune-related disorders. By combining advanced laboratory diagnostics with personalized therapy, we help support and regulate the immune system for improved long-term health.",
  },
  {
    icon: <Droplet className="h-10 w-10" />,
    title: "Hematology",
    description:
      "Our Hematology Department specializes in blood, bone marrow, and lymphatic system disorders. We diagnose and treat anemia, leukemia, lymphoma, hemophilia, thrombosis, platelet disorders, bone marrow failures, and clotting diseases. Services include blood transfusion support, hematological oncology care, bone marrow biopsy, and comprehensive blood screening. With expert hematologists and modern laboratory facilities, we ensure accurate diagnosis and targeted treatment for complex blood-related conditions.",
  },
  {
    icon: <SquareBottomDashedScissors className="h-10 w-10" />,
    title: "Gastroenterology",
    description:
      "The Gastroenterology Department offers specialized care for diseases affecting the digestive system, including the esophagus, stomach, intestines, liver, pancreas, bile ducts, and colon. We provide advanced treatments for GERD, ulcers, hepatitis, IBD, IBS, pancreatitis, gallstones, celiac disease, and gastrointestinal cancers. With endoscopy, colonoscopy, ERCP, and cutting-edge digestive diagnostics, our team offers accurate evaluation, minimally invasive procedures, and long-term management of digestive disorders.",
  },
  {
    icon: <Bone className="h-10 w-10" />,
    title: "Orthopedics",
    description:
      "Our Orthopedics Department focuses on the diagnosis and treatment of musculoskeletal disorders. We manage fractures, sports injuries, spine problems, arthritis, joint pain, and congenital bone conditions. Specialized services include joint replacement surgeries, trauma care, arthroscopy, physiotherapy, and rehabilitation. Our expert team of orthopedic surgeons and therapists work together to restore mobility, reduce pain, and enhance physical function, helping patients return to active and healthy lifestyles.",
  },
  {
    icon: <LucideParkingSquare className="h-10 w-10" />,
    title: "Pulmonary",
    description:
      "The Pulmonary Department provides comprehensive care for diseases affecting the lungs and respiratory system. We diagnose and treat asthma, COPD, tuberculosis, pneumonia, lung infections, sleep apnea, and pulmonary hypertension. Our facilities include advanced lung imaging, pulmonary function testing, bronchoscopy, and sleep study centers. With experienced pulmonologists and evidence-based treatment plans, we help patients breathe better, recover faster, and live healthier lives.",
  },
];
