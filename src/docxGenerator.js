import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

export const generateContractDocx = async (formData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Titre principal
          new Paragraph({
            text: "AVENANT N°1 AU CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // ENTRE LES SOUSSIGNÉS
          new Paragraph({
            children: [
              new TextRun({
                text: "ENTRE LES SOUSSIGNÉS :",
                bold: true
              })
            ],
            spacing: { after: 200 }
          }),

          // Informations de l'entreprise
          new Paragraph({
            children: [
              new TextRun({
                text: `La société `,
              }),
              new TextRun({
                text: formData.companyName || "[NOM DE L'ENTREPRISE]",
                bold: true
              }),
              new TextRun({
                text: `,`
              })
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            text: `Dont le siège social est situé à : ${formData.companyAddress || "[ADRESSE DE L'ENTREPRISE]"},`,
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Représentée par ${formData.repGender} `
              }),
              new TextRun({
                text: formData.repName || "[NOM DU REPRÉSENTANT]",
                bold: true
              }),
              new TextRun({
                text: `,`
              })
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Agissant en qualité de : "
              }),
              new TextRun({
                text: formData.repRole || "[FONCTION]",
                bold: true
              }),
              new TextRun({
                text: "."
              })
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Ci-après désignée « La Société » ou « L'Employeur »,",
                italics: true
              })
            ],
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: "D'une part,",
            alignment: AlignmentType.RIGHT,
            spacing: { after: 200 }
          }),

          // ET
          new Paragraph({
            children: [
              new TextRun({
                text: "ET :",
                bold: true
              })
            ],
            spacing: { after: 200 }
          }),

          // Informations du salarié
          new Paragraph({
            children: [
              new TextRun({
                text: `${formData.employeeGender} `
              }),
              new TextRun({
                text: formData.employeeName || "[NOM DU SALARIÉ]",
                bold: true
              }),
              new TextRun({
                text: `,`
              })
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            text: `Demeurant à : ${formData.employeeAddress || "[ADRESSE DU SALARIÉ]"},`,
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Ci-après désigné(e) « Le Salarié »,",
                italics: true
              })
            ],
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: "D'autre part,",
            alignment: AlignmentType.RIGHT,
            spacing: { after: 400 }
          }),

          // Ligne de séparation (simulée avec des tirets)
          new Paragraph({
            text: "————————————————————————————————",
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // IL A ÉTÉ CONVENU
          new Paragraph({
            children: [
              new TextRun({
                text: "IL A ÉTÉ CONVENU ET ARRÊTÉ CE QUI SUIT :",
                bold: true
              })
            ],
            spacing: { after: 300 }
          }),

          // Préambule
          new Paragraph({
            children: [
              new TextRun({
                text: "Préambule",
                bold: true,
                size: 20
              })
            ],
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: "Le Salarié a été engagé par la Société dans le cadre d'un contrat de travail à durée indéterminée.",
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Les parties se sont rapprochées afin de modifier les conditions d'emploi du Salarié, à savoir : "
              }),
              new TextRun({
                text: formData.amendmentObject,
                bold: true
              }),
              new TextRun({
                text: "."
              })
            ],
            spacing: { after: 300 }
          }),

          // Article 1
          new Paragraph({
            children: [
              new TextRun({
                text: "Article 1 - Modification",
                bold: true,
                size: 20
              })
            ],
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: formData.amendmentContent,
            spacing: { after: 300 }
          }),

          // Article 2
          new Paragraph({
            children: [
              new TextRun({
                text: "Article 2 - Autres dispositions",
                bold: true,
                size: 20
              })
            ],
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: "Toutes les autres dispositions du contrat de travail initial et de ses éventuels avenants antérieurs, non contraires aux présentes, demeurent inchangées et continuent de produire leurs pleins effets.",
            spacing: { after: 500 }
          }),

          // Signatures
          new Paragraph({
            children: [
              new TextRun({
                text: `Fait à ..........................., le ${formData.amendmentDate}`
              })
            ],
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: "Fait en deux exemplaires originaux.",
            spacing: { after: 300 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Pour l'Employeur\t\t\t\t\t\tPour le Salarié"
              })
            ],
            spacing: { after: 600 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "(Signature)\t\t\t\t\t\t\t(Signature)"
              })
            ]
          })
        ]
      }
    ]
  });

  return await Packer.toBlob(doc);
};