﻿using API;
using SautinSoft.Document;
using SautinSoft.Document.Tables;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Word
{
    class Program
    {
        static List<ContentContact> contacts = new List<ContentContact>();
        static List<ContentSummary> summaries = new List<ContentSummary>();
        static DocumentCore docx;
        private static Section section;
        private static List<string> summary = new List<string>(0);

        static void Main(string[] args)
        {
            XmlTextReader reader = new XmlTextReader("~/../../../../../xml/resume.xml");

            XmlTag top = new XmlTag("XML");
            XmlTag target = top;

            while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.Element: 
                        target = target.CreateChild(reader.Name);
                        break;
                    case XmlNodeType.Text: 
                        target.Text = reader.Value;
                        break;
                    case XmlNodeType.EndElement: 
                        target = target.Parent;
                        break;
                }
            }
            top = top.Childs[0];


            docx = new DocumentCore();

            // Add a new section 
            section = new Section(docx);
            section.PageSetup.PageWidth = LengthUnitConverter.Convert(8.5, LengthUnit.Inch, LengthUnit.Point);
            section.PageSetup.PageHeight = LengthUnitConverter.Convert(11.0, LengthUnit.Inch, LengthUnit.Point);
            section.PageSetup.Orientation = Orientation.Portrait;
            section.PageSetup.PageMargins = new PageMargins()
            {
                Top = LengthUnitConverter.Convert(.5f, LengthUnit.Inch, LengthUnit.Point),
                Right = LengthUnitConverter.Convert(.5f, LengthUnit.Inch, LengthUnit.Point),
                Bottom = LengthUnitConverter.Convert(.5f, LengthUnit.Inch, LengthUnit.Point),
                Left = LengthUnitConverter.Convert(.5f, LengthUnit.Inch, LengthUnit.Point)
            };

            docx.Sections.Add(section);
            docx.Styles.Add(Template.StyleBullet);

            Table table = new Table(docx);
            table.TableFormat.PreferredWidth = new TableWidth(100, TableWidthUnit.Percentage);
            section.Blocks.Add(table);



            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            table.Rows.Add(new ContentName().Content(docx));
            table.Rows.Add(new ContentContact(top.Childs[0].Childs).Content(docx));
            table.Rows.Add(new TableRow(docx, new TableCell(docx, Template.LineBreak(docx))));

            table.Rows.Add(new ContentHeading().Content(docx, "SUMMARY"));//////////////////////////////////////////////////////////////
            table.Rows.Add(new ContentSummary(top.Childs[1].Childs).Content(docx));
            table.Rows.Add(new TableRow(docx, new TableCell(docx, Template.LineBreak(docx))));


            table.Rows.Add(new ContentHeading().Content(docx, "SKILLS"));//////////////////////////////////////////////////////////////
            TableRow row = new TableRow(docx, new TableCell(docx), new TableCell(docx));
            table.Rows.Add(row);
            foreach (TableCell cell in row.Cells)
            {
                cell.CellFormat.PreferredWidth = new TableWidth(50, TableWidthUnit.Auto);
                cell.ColumnSpan = 1;
            }

            List<Table> area = new ContentSkill(top.Childs[5].Childs).Content(docx);
            for (int i = 0; i < area.Count; i++)
            {
                if (i < area.Count / 2)
                {
                    row.Cells[0].Blocks.Add(area[i]);
                }
                else
                {
                    row.Cells[1].Blocks.Add(area[i]);
                }
            }
            table.Rows.Add(new TableRow(docx, new TableCell(docx, Template.LineBreak(docx))));


            table.Rows.Add(new ContentHeading().Content(docx, "WORKS AND RELATED EXPERIENCES"));//////////////////////////////////////////////////////////////
            foreach (TableRow item in new ContentExperience(top.Childs[2].Childs).Content(docx))
                table.Rows.Add(item);
            table.Rows.Add(new TableRow(docx, new TableCell(docx, Template.LineBreak(docx))));


            table.Rows.Add(new ContentHeading().Content(docx, "EDUCATION"));//////////////////////////////////////////////////////////////
            foreach (TableRow item in new ContentEducation(top.Childs[3].Childs).Content(docx))
                table.Rows.Add(item);
            table.Rows.Add(new TableRow(docx, new TableCell(docx, Template.LineBreak(docx))));

            table.Rows.Add(new ContentHeading().Content(docx, "AWARDS AND HONOURS"));//////////////////////////////////////////////////////////////
            foreach (TableRow item in new ContentAwards(top.Childs[4].Childs).Content(docx))
                table.Rows.Add(item);
            table.Rows.Add(new TableRow(docx, new TableCell(docx, Template.LineBreak(docx))));


            table.Rows.Add(new ContentHeading().Content(docx, "VOLUNTEER ACTIVITIES"));//////////////////////////////////////////////////////////////
            foreach (TableRow item in new ContentExperience(top.Childs[6].Childs).Content(docx))
                table.Rows.Add(item);
            table.Rows.Add(new TableRow(docx, new TableCell(docx, Template.LineBreak(docx))));


            docx.Save("resume.docx");

            System.Diagnostics.Process.Start(Path.Combine(Directory.GetCurrentDirectory(), "resume.docx"));
        }


    }
    
}
