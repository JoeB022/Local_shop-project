// src/pages/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
    return (
        <div className="about-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>About Local Shop Project</h1>
            <p>
                The Local Shop project is designed to provide a comprehensive solution for managing local retail businesses.
                Our platform aims to streamline operations, enhance customer experience, and improve overall efficiency.
                With a user-friendly interface, it allows shop owners, clerks, and administrators to manage their tasks seamlessly.
            </p>
            <p>
                This project incorporates various features tailored to meet the needs of local shops, including inventory management,
                order processing, and user authentication. By leveraging modern web technologies, we ensure that the platform is
                both responsive and accessible, allowing users to manage their shops from any device, anywhere.
            </p>
            <p>
                Our mission is to empower local businesses by providing them with the tools they need to thrive in a competitive market.
                We believe that by simplifying the management process, shop owners can focus more on what they do best: serving their customers.
                We are committed to continuous improvement and welcome feedback from our users to enhance the platform further.
            </p>
        </div>
    );
};

export default AboutPage;