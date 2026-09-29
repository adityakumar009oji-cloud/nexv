import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';
import { ProjectDetailModal } from './ProjectDetailModal';

interface PortfolioProps {
  onInquireProject: (projectName: string) => void;
}

type CategoryType = 'All' | 'Web Design' | 'Branding' | 'Social Media' | 'Video' | 'Marketing';

export const Portfolio: React.FC<PortfolioProps> = ({ onInquireProject }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [selectedProject, setSelectedProject] = useState<typeof agencyConfig.projects[0] | null>(null);

  const categories: CategoryType[] = [
    'All',
    'Web Design',
    'Branding',
    'Social Media',
    'Video',
    'Marketing'
  ];

  const filteredProjects = activeCategory === 'All'
    ? agencyConfig.projects
    : agencyConfig.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="relative py-28 bg-[#0E0E0E]/75 backdrop-blur-sm border-t border-white/5 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
                CASE ARCHIVE
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              SELECTED WORK
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              Work that combines strategy, creativity and technology. Each engagement is designed to solve a critical commercial challenge.
            </p>
          </div>

          {/* Interactive Category Filter Controls (Functional Button Tabs) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-900/80 border border-white/10 rounded-xl backdrop-blur-md self-start md:self-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              data-cursor="VIEW"
              className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-neutral-900/30 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-950">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Corner Action Indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  {/* Unboxed clean metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <span className="text-indigo-400">{project.number}</span>
                    <span>/</span>
                    <span className="text-white">{project.client}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-display group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Services Provided (Unboxed text with dots) */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="text-neutral-400 truncate max-w-[80%]">
                    {project.servicesProvided.join(' · ')}
                  </div>
                  <span className="text-indigo-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireSimilar={(title) => {
          onInquireProject(title);
        }}
      />
    </section>
  );
};
