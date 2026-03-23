/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const WhitepaperContent = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 font-sans text-slate-800 leading-relaxed">
      <header className="mb-16 border-b border-slate-200 pb-8">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-4">
          X-WING Endpoint Security Management System
        </h1>
        <p className="text-2xl font-light text-slate-500 italic">Product Whitepaper</p>
      </header>

      <nav className="mb-16 bg-slate-50 p-8 rounded-2xl border border-slate-100">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Table of Contents</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#ch1" className="hover:text-indigo-600 transition-colors">Chapter 1: Product Overview</a></li>
          <li><a href="#ch2" className="hover:text-indigo-600 transition-colors">Chapter 2: Product Architecture</a></li>
          <li><a href="#ch3" className="hover:text-indigo-600 transition-colors">Chapter 3: Core Capabilities</a></li>
          <li><a href="#ch4" className="hover:text-indigo-600 transition-colors">Chapter 4: Advanced Threat Detection & Response</a></li>
          <li><a href="#ch5" className="hover:text-indigo-600 transition-colors">Chapter 5: Deployment & Implementation</a></li>
          <li><a href="#ch6" className="hover:text-indigo-600 transition-colors">Chapter 6: Typical Application Scenarios</a></li>
          <li><a href="#ch7" className="hover:text-indigo-600 transition-colors">Chapter 7: Compliance & Value</a></li>
          <li><a href="#ch8" className="hover:text-indigo-600 transition-colors">Chapter 8: Summary</a></li>
        </ul>
      </nav>

      <section id="ch1" className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">Chapter 1: Product Overview</h2>
        <p className="mb-4">
          In today's accelerating digital transformation, enterprise endpoint security faces increasingly complex and covert threats. Traditional signature-based protection is no longer sufficient. <span className="bg-indigo-100 text-indigo-800 px-1 rounded font-semibold">X-WING Endpoint Security Management System</span> emerges as a professional <span className="font-bold">SaaS</span>-based solution, building a full-chain "Prevention-Detection-Response-Traceability" capability.
        </p>
        
        <h3 className="text-xl font-semibold mt-8 mb-3">1.1 Industry Background & Market Pain Points</h3>
        <p>With the rise of remote and hybrid work, threats like phishing, <span className="text-rose-600 font-bold underline decoration-wavy" title="Correction: Standard term is Fileless Attack">Fileless Attacks</span>, and ransomware have become sophisticated. Traditional silos fail to provide a unified defense.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">1.2 Product Positioning & Core Value</h3>
        <p>
          X-WING targets "One-stop Endpoint Security Management." It follows the <span className="bg-indigo-100 text-indigo-800 px-1 rounded font-semibold">One Terminal, One Platform, One Cloud</span> architecture. It integrates <span className="bg-emerald-100 text-emerald-800 px-1 rounded font-semibold">EPP</span> (Endpoint Protection Platform) and <span className="bg-emerald-100 text-emerald-800 px-1 rounded font-semibold">EDR</span> (Endpoint Detection and Response) to shift from passive defense to <span className="font-bold">Active Protection</span>.
        </p>
      </section>

      <section id="ch2" className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">Chapter 2: Product Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold mb-2">Terminal Layer</h4>
            <p className="text-sm text-slate-600">Deploys the <span className="bg-indigo-100 text-indigo-800 px-1 rounded font-semibold">X-WING Unified Agent</span>. Uses <span className="font-bold">Kernel-level</span> data collection to ensure zero impact on office experience.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold mb-2">Cloud Platform Layer</h4>
            <p className="text-sm text-slate-600">A <span className="font-bold">Unified Global Cloud Fabric</span> providing policy management, threat analysis, and automated response.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-8 mb-3">2.2 Client Architecture</h3>
        <p>The agent consists of the Base Framework, <span className="bg-emerald-100 text-emerald-800 px-1 rounded font-semibold">NGAV</span> (Next-Gen Anti-Virus) Engine, Detection Engine, and Communication Module.</p>
        
        <h3 className="text-xl font-semibold mt-8 mb-3">2.4 Cloud-Ground Collaboration</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Policy Distribution:</strong> Incremental updates via encrypted channels.</li>
          <li><strong>Encrypted Return:</strong> Real-time backhaul of logs and <span className="bg-amber-100 text-amber-800 px-1 rounded font-semibold">IOA</span> (Indicators of Attack).</li>
          <li><strong>Traceability:</strong> Reconstructing the attack chain via <span className="bg-indigo-100 text-indigo-800 px-1 rounded font-semibold">AI-Powered Threat Hunting</span>.</li>
        </ul>
      </section>

      <section id="ch3" className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">Chapter 3: Core Capabilities</h2>
        <h3 className="text-xl font-semibold mt-8 mb-3">3.1 Prevention: Multi-Engine Protection</h3>
        <p>Integrates Cloud Scanning, <span className="text-rose-600 font-bold underline decoration-wavy" title="Correction: Script Detection is the standard term">Script Detection</span>, and Active Defense.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">3.2 Detection: Kernel-level Behavior Collection</h3>
        <p>Uses <span className="bg-indigo-100 text-indigo-800 px-1 rounded font-semibold">Omni-directional Data Sensing</span> (R0 Kernel + R3 User) to capture processes, files, network, and registry events.</p>
        <p className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-sm">
          <strong>ATT&CK Coverage:</strong> Full coverage across Initial Access, Execution, Persistence, Privilege Escalation, and <span className="font-bold">Asset Invisibility</span>.
        </p>
      </section>

      <section id="ch4" className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">Chapter 4: Advanced Detection & Response</h2>
        <p className="mb-4">X-WING leverages <span className="bg-indigo-100 text-indigo-800 px-1 rounded font-semibold">Native Capability Fusion</span> to provide a seamless EDR experience.</p>
        <h3 className="text-xl font-semibold mt-8 mb-3">4.3 AI-Driven Threat Assessment</h3>
        <p>Utilizes Large Language Models (LLM) for <span className="bg-indigo-100 text-indigo-800 px-1 rounded font-semibold">AI-Powered Threat Hunting</span>, reducing analysis time from hours to minutes.</p>
      </section>

      <section id="ch5" className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">Chapter 5: Deployment & Implementation</h2>
        <p>Deployment is simplified via the <span className="bg-indigo-100 text-indigo-800 px-1 rounded font-semibold">X-WING SASE Platform</span>. No on-premise servers required.</p>
        <div className="mt-6 p-6 border border-slate-200 rounded-xl">
          <h4 className="font-bold mb-4">Network Requirements</h4>
          <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
            TCP: gw-cloud.rongma.com (Port 80)<br/>
            TCP: ccs-o-s01.rongma.cn (Ports 80, 8080, 443)<br/>
            UDP: ccs-o-q01.rongma.cn (Port 10000)
          </code>
        </div>
      </section>

      <section id="ch6" className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">Chapter 6: Typical Scenarios</h2>
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-bold text-indigo-600">Ransomware Defense</h4>
            <p className="text-sm">EPP blocks the landing, EDR monitors the encryption behavior, and AI generates the attribution report.</p>
          </div>
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-bold text-indigo-600">Fileless Attack Detection</h4>
            <p className="text-sm">Captures PowerShell anomalies and <span className="bg-amber-100 text-amber-800 px-1 rounded font-semibold">IOA</span> logic without relying on file signatures.</p>
          </div>
        </div>
      </section>

      <footer className="mt-24 pt-12 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>© 2026 QAX Group. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-4">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded-full"></span> X-WING Keyword</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span> Industry Standard</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-rose-500 rounded-full"></span> Translation Correction</span>
        </div>
      </footer>
    </div>
  );
};
