import React, { useState } from 'react';
import {
  FileText,
  Download,
  ChevronRight,
  CheckCircle2,
  Building2,
  User,
  Briefcase,
  ArrowRight,
  Lock
} from 'lucide-react';
import { amendmentTemplates } from './amendmentTemplates';
import { generateContractDocx } from './docxGenerator';

export default function App() {
  const [step, setStep] = useState(1);
  const [isGenerated, setIsGenerated] = useState(false);


  // State pour les données du formulaire
  const [formData, setFormData] = useState({
    // Champs requis
    companyName: '',
    companyAddress: '',
    repGender: 'M.',
    repName: '',
    repRole: '',

    // Champs additionnels
    employeeGender: 'M.',
    employeeName: '',
    employeeAddress: '',
    amendmentDate: new Date().toISOString().split('T')[0],
    amendmentObject: 'Modification de la rémunération',
    amendmentContent: amendmentTemplates['Modification de la rémunération'],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si on change l'objet de l'avenant, mettre à jour automatiquement le contenu
    if (name === 'amendmentObject') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        amendmentContent: amendmentTemplates[value] || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDownloadClick = async () => {
    setIsGenerated(true);

    try {
      // Génération du document DOCX
      const blob = await generateContractDocx(formData);

      // Téléchargement du fichier
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Avenant_CDI_${formData.companyName || 'Document'}_${formData.amendmentDate}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de la génération du document:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 print:p-0 print:max-w-none">

        {/* Header Section (Hidden on print) */}
        <div className="text-center mb-12 print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <FileText size={14} />
            Outil Gratuit RH
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">
            Générateur d'Avenant au Contrat de Travail (CDI)
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Créez un avenant conforme en quelques clics. Remplissez les informations, visualisez le document en temps réel et téléchargez votre PDF prêt à signer.
          </p>
        </div>

        {/* Main Content: Split Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 print:block">

          {/* Left Column: Form (Hidden on print) */}
          <div className="lg:col-span-5 space-y-6 print:hidden">

            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-6 text-sm">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${step === 1 ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-500'}`}
              >
                1. Employeur
              </button>
              <ChevronRight size={16} className="text-gray-300" />
              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${step === 2 ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-500'}`}
              >
                2. Salarié & Objet
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Building2 className="text-blue-600" size={20}/>
                    Informations de l'entreprise
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">Ces informations apparaîtront dans l'en-tête de l'avenant.</p>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom de l'entreprise / Employeur</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Ex: PayFit SAS"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Adresse du siège social</label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      placeholder="Ex: 23 Rue de la Paix, 75002 Paris"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-slate-700 mb-1">Représenté par</label>
                       <div className="flex gap-3">
                         <select
                           name="repGender"
                           value={formData.repGender}
                           onChange={handleInputChange}
                           className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                         >
                           <option value="M.">M.</option>
                           <option value="Mme">Mme</option>
                         </select>
                         <input
                          type="text"
                          name="repName"
                          value={formData.repName}
                          onChange={handleInputChange}
                          placeholder="Ex: Jean Dupont"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                       </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Agissant en qualité de</label>
                      <input
                        type="text"
                        name="repRole"
                        value={formData.repRole}
                        onChange={handleInputChange}
                        placeholder="Ex: Directeur Général"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                    >
                      Suivant <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <User className="text-blue-600" size={20}/>
                    Salarié et Objet de l'avenant
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet du salarié</label>
                    <div className="flex gap-3">
                       <select
                           name="employeeGender"
                           value={formData.employeeGender}
                           onChange={handleInputChange}
                           className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                         >
                           <option value="M.">M.</option>
                           <option value="Mme">Mme</option>
                       </select>
                       <input
                        type="text"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleInputChange}
                        placeholder="Ex: Marie Martin"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Adresse du salarié</label>
                     <input
                        type="text"
                        name="employeeAddress"
                        value={formData.employeeAddress}
                        onChange={handleInputChange}
                        placeholder="Ex: 10 Rue de la Liberté, 69002 Lyon"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      />
                  </div>

                  <div className="border-t border-gray-100 my-4 pt-4">
                    <h4 className="text-md font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <Briefcase className="text-blue-600" size={18}/>
                      Modification
                    </h4>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Objet de l'avenant</label>
                      <select
                        name="amendmentObject"
                        value={formData.amendmentObject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none mb-3"
                      >
                        <option>Modification de la rémunération</option>
                        <option>Changement de poste / Promotion</option>
                        <option>Modification du temps de travail</option>
                        <option>Modification du lieu de travail</option>
                        <option>Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Détails de la modification</label>
                      <textarea
                        name="amendmentContent"
                        value={formData.amendmentContent}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full h-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                        placeholder="Décrivez ici les changements contractuels..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="w-full text-slate-600 bg-gray-100 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleDownloadClick}
                      className="w-full flex justify-center items-center gap-2 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-md hover:shadow-lg"
                    >
                      Télécharger <Download size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Signals */}
            <div className="flex justify-between items-center text-xs text-slate-500 px-2">
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-500"/> Conforme Code du Travail</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-500"/> RGPD Friendly</span>
              <span className="flex items-center gap-1"><Lock size={12} className="text-green-500"/> Sécurisé</span>
            </div>
          </div>

          {/* Right Column: Live Preview */}
          <div className="lg:col-span-7 mt-8 lg:mt-0 print:col-span-12 print:mt-0">
            <div className="sticky top-24 print:static">
              <div className="flex justify-between items-center mb-4 print:hidden">
                <h2 className="text-lg font-bold text-slate-700">Aperçu du document</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-200">Avenant CDI</span>
              </div>

              {/* The Paper Document */}
              <div className="bg-white p-8 sm:p-12 shadow-2xl rounded-sm border border-gray-200 min-h-[800px] text-sm text-slate-800 font-serif relative overflow-hidden print:shadow-none print:border-none print:p-0">

                {/* Watermark until generated */}
                {!isGenerated && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] z-0 select-none overflow-hidden print:hidden">
                     <div className="transform -rotate-45 text-9xl font-bold text-slate-900 whitespace-nowrap">
                       PAYFIT PREVIEW PAYFIT PREVIEW
                     </div>
                  </div>
                )}

                <div className="relative z-10 space-y-6 leading-relaxed">
                  <div className="text-center font-bold uppercase underline mb-8 text-base">
                    AVENANT N°1 AU CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE
                  </div>

                  <div className="space-y-4">
                    <p><strong>ENTRE LES SOUSSIGNÉS :</strong></p>

                    <div className="pl-4 border-l-2 border-blue-100 bg-blue-50/30 p-2 print:border-none print:bg-transparent print:p-0">
                      <p>La société <strong>{formData.companyName || "[NOM DE L'ENTREPRISE]"}</strong>,</p>
                      <p>Dont le siège social est situé à : {formData.companyAddress || "[ADRESSE DE L'ENTREPRISE]"},</p>
                      <p>Représentée par {formData.repGender} <strong>{formData.repName || "[NOM DU REPRÉSENTANT]"}</strong>,</p>
                      <p>Agissant en qualité de : <strong>{formData.repRole || "[FONCTION]"}</strong>.</p>
                      <p className="mt-2 text-slate-500 italic">Ci-après désignée « La Société » ou « L'Employeur »,</p>
                    </div>

                    <p className="text-right">D'une part,</p>

                    <p><strong>ET :</strong></p>

                    <div className="pl-4 border-l-2 border-gray-100 p-2 print:border-none print:p-0">
                      <p>{formData.employeeGender} <strong>{formData.employeeName || "[NOM DU SALARIÉ]"}</strong>,</p>
                      <p>Demeurant à : {formData.employeeAddress || "[ADRESSE DU SALARIÉ]"},</p>
                      <p className="mt-2 text-slate-500 italic">Ci-après désigné(e) « Le Salarié »,</p>
                    </div>

                    <p className="text-right">D'autre part,</p>
                  </div>

                  <div className="my-8 h-px bg-slate-200 w-1/2 mx-auto print:bg-black"></div>

                  <p><strong>IL A ÉTÉ CONVENU ET ARRÊTÉ CE QUI SUIT :</strong></p>

                  <div className="space-y-4">
                    <h4 className="font-bold uppercase text-xs tracking-wider border-b border-gray-200 pb-1">Préambule</h4>
                    <p>Le Salarié a été engagé par la Société dans le cadre d'un contrat de travail à durée indéterminée.</p>
                    <p>Les parties se sont rapprochées afin de modifier les conditions d'emploi du Salarié, à savoir : <strong>{formData.amendmentObject}</strong>.</p>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h4 className="font-bold uppercase text-xs tracking-wider border-b border-gray-200 pb-1">Article 1 - Modification</h4>
                    <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-100 border-dashed print:bg-transparent print:border-none print:p-0">
                      {formData.amendmentContent}
                    </p>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h4 className="font-bold uppercase text-xs tracking-wider border-b border-gray-200 pb-1">Article 2 - Autres dispositions</h4>
                    <p>Toutes les autres dispositions du contrat de travail initial et de ses éventuels avenants antérieurs, non contraires aux présentes, demeurent inchangées et continuent de produire leurs pleins effets.</p>
                  </div>

                  <div className="mt-12 flex justify-between gap-8">
                    <div className="w-1/2">
                      <p className="mb-8">Fait à ..........................., le {formData.amendmentDate}</p>
                      <p className="font-bold text-xs uppercase mb-16">Pour l'Employeur</p>
                      <p className="text-xs text-gray-400 border-t border-gray-300 pt-1 w-32">(Signature)</p>
                    </div>
                    <div className="w-1/2">
                      <p className="mb-8">Fait en deux exemplaires originaux.</p>
                      <p className="font-bold text-xs uppercase mb-16">Pour le Salarié</p>
                      <p className="text-xs text-gray-400 border-t border-gray-300 pt-1 w-32">(Signature)</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}