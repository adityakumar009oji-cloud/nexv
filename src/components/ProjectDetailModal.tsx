import React from 'react';
import { X, ArrowUpRight, CheckCircle2, Calendar, User, Tag } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface ProjectDetailModalProps {
  project: typeof agencyConfig.projects[0] | null;
  onClose: () => void;
  onInquireSimilar: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onInquireSimilar,
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-auto bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/10 transition-colors shadow-lg"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Featured Image Banner */}
        <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-neutral-950">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-mono mb-2">
              <span>PROJECT {project.number}</span>
              <span>·</span>
              <span>{project.category}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Metadata Row (Unboxed clean text) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/5 border border-white/5 text-xs">
            <div>
              <span className="text-neutral-500 block mb-1">CLIENT</span>
              <span className="text-white font-medium">{project.client}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">CATEGORY</span>
              <span className="text-white font-medium">{project.category}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">TIMEFRAME</span>
              <span className="text-white font-medium">{project.year}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">PRIMARY OUTCOME</span>
              <span className="text-emerald-400 font-semibold">{project.results}</span>
            </div>
          </div>

          {/* Deep Overview */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Project Overview
            </h3>
            <p className="text-base text-neutral-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-white/5 space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                The Challenge
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900/60 border border-white/5 space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Our Solution
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Services Provided (Rendered as clean unboxed text with bullets) */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Scope of Work Delivered
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-300">
              {project.servicesProvided.map((service, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 text-center sm:text-left">
              Need a similar outcome for your brand? Let's discuss your scope.
            </div>

            <button
              onClick={() => {
                onInquireSimilar(project.title);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors shadow-lg shadow-indigo-600/30"
            >
              <span>Inquire About A Similar Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
