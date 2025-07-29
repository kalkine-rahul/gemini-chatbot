
const AboutPage = () => {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'] },
    { category: 'Data Visualization', items: ['D3.js', 'Chart.js', 'Highcharts'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Django', 'Express', 'MongoDB', 'SQL'] },
    { category: 'DevOps & Tools', items: ['Git', 'GitLab', 'AWS', 'Jira', 'Agile Methodologies'] },
  ];

  const experience = [
    {
      role: "Frontend Developer",
      company: "Current Company",
      period: "Sep 2023 - Present",
      achievements: [
        "Led development of 10+ React applications with Next.js",
        "Created interactive dashboards with D3.js improving data visibility by 40%",
        "Implemented CI/CD pipelines reducing deployment time by 30%"
      ]
    },
    {
      role: "Associate Software Engineer",
      company: "Previous Company",
      period: "Dec 2021- Aug 2023",
      achievements: [
        "Developed responsive web applications serving 50k+ monthly users",
        "Built reusable component library saving 100+ development hours",
        "Optimized performance reducing load times by 25%"
      ]
    }
  ];

  const projects = [
    {
      title: "Kalkine Financial Platforms (AU/CA/NZ/IN/UK/US)",
      description: "Worked as a Frontend Developer on Kalkine’s Australian and Canadian platforms — dynamic financial websites offering market research, stock insights, and investment news. Contributed to building responsive interfaces, enhancing user experience, and implementing interactive components using modern HTML, CSS, JavaScript, and Bootstrap practices. Focused on optimizing performance, mobile responsiveness, and ensuring design consistency across both regional versions.",
      technologies: ['React', 'D3.js', 'Next.js', 'Tailwind CSS', 'Python', 'Bootstrap 5'],
      link: "https://kalkine.com.au/"
    },
    {
      title: "GRC Platform",
      description: "A comprehensive full-stack Governance, Risk, and Compliance (GRC) application designed to help organizations manage regulatory policies, risk assessments, audit trails, and compliance workflows. Built using React for dynamic front-end interfaces and Node.js with MongoDB for a scalable backend. Integrated secure payment systems and role-based access control. Followed Agile methodology using Jira for sprint planning and issue tracking, with a strong focus on reusable design patterns and UI consistency via Material UI.",
      technologies: ['React', 'Node.js', 'MongoDB', 'Meterial UI' , 'Jira', 'Agile', "Design Pattern"],
      link: ""
    },
    {
      title: "Email Template System",
      description: "Responsive email templates compatible with all major clients",
      technologies: ['HTML', 'CSS'],
      link: ""
    }
  ];

  return (
  
     
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/3">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-indigo-500 mx-auto">
              <img 
              src="./profilemine.jpg"
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-white-800 mb-4">Hi, I am Rahul Kumar</h1>
            <h2 className="text-2xl text-blue-200 mb-6">Front End Developer</h2>
            <p className="text-lg text-white-600 mb-6">
              With 3.6+ years of experience building modern web applications, I specialize in React, Next.js, 
              and data visualization. I am passionate about creating intuitive, performant user experiences 
              with clean, maintainable code.
            </p>
            <div className="flex gap-4">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Contact Me
              </a>
              <a 
                href="./Rahul_Resume_.pdf" 
                download
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg  transition bg-amber-50"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white-800 mb-8">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white-800 mb-8">Professional Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-indigo-600">{exp.company}</p>
                  </div>
                  <span className="text-white-500">{exp.period}</span>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-white-700">{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white-800 mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-white-400">Project Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-white-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    className="text-indigo-600 font-medium hover:underline inline-flex items-center"
                  >
                    View Project
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-white-800 mb-6">Get In Touch</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-blue-200 border"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
  
  );
};

export default AboutPage;
