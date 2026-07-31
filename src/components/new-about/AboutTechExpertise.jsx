import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const expertise = [
  "AI & Machine Learning",
  "IoT & IIoT Solutions",
  "Cloud & DevOps",
  "Web & Mobile Development",
  "ERP & CRM Solutions"
];

const techStack = [
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    url: 'https://react.dev'
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    url: 'https://nodejs.org'
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    url: 'https://www.python.org'
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    url: 'https://www.oracle.com/java/'
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    url: 'https://www.typescriptlang.org'
  },
  {
    name: 'AWS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    url: 'https://aws.amazon.com'
  },
  {
    name: 'Azure',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    url: 'https://azure.microsoft.com'
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg',
    url: 'https://www.mysql.com'
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    url: 'https://www.mongodb.com'
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    url: 'https://www.docker.com'
  },
  {
    name: 'Kubernetes',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    url: 'https://kubernetes.io'
  },
  {
    name: 'Flutter',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    url: 'https://flutter.dev'
  }
];

const AboutTechExpertise = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch mb-12">

      {/* Left: Our Expertise */}
      <div className="lg:w-1/3 bg-[#050112] border border-gray-800/80 rounded-2xl p-8 shadow-xl flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4">Our Expertise</h3>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-8">
          We combine domain knowledge with cutting-edge technologies to build solutions that are secure, scalable, and future-ready.
        </p>
        <div className="flex flex-col gap-4">
          {expertise.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
              <span className="text-[12px] text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Technologies */}
      <div className="lg:w-2/3 bg-[#050112] border border-gray-800/80 rounded-2xl p-8 shadow-xl flex flex-col">
        <h3 className="text-xl font-bold text-white mb-8">Technologies We Work With</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1">
          {techStack.map((tech, idx) => (
            <motion.a
              key={idx}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="border border-gray-800 rounded-xl p-4 flex items-center justify-center gap-3 hover:border-purple-500/50 hover:bg-purple-900/10 transition-colors group cursor-pointer decoration-transparent"
            >
              <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain filter grayscale grayscale-0  transition-all" />
              <span className="text-[11px] font-medium text-gray-400 group-hover:text-white transition-colors">{tech.name}</span>
            </motion.a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutTechExpertise;
