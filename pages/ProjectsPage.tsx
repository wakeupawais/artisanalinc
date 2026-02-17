import React from 'react';
import GridBackground from '../components/GridBackground';
import Projects from '../components/Projects';

const ProjectsPage: React.FC = () => {
    return (
        <>
            <GridBackground />

            <div className="pt-32">
                <Projects />
            </div>
        </>
    );
};

export default ProjectsPage;
