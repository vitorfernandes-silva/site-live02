import type { Metadata } from "next";
import ProjectConfigurator from "@/components/ui/project-configurator";

export const metadata: Metadata = {
  title: "Configurar Projeto — JAGWAR Performance & Growth",
  description:
    "Configure os pilares, especialidades e aceleradores do seu projeto de crescimento para e-commerce de moda feminina e descubra seu momento de negócio ideal.",
};

export default function ConfigurarProjetoPage() {
  return <ProjectConfigurator theme="dark" />;
}
