// mainpage.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './mainpage.css';

import HomePage from './homepage';
import RSAPage from './rsapage';

function MainPage() {
	return (
		<Router>
			<div id="root">
				<nav className="navbar">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/rsa">RSA</Link></li>
						<li><Link to="/xss">XSS</Link></li>
						<li><Link to="/SQL">SQL Injection</Link></li>
						<li><Link to="/Phishing">Phishing</Link></li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/rsa" element={<RSAPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default MainPage;
