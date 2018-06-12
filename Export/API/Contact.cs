using SautinSoft.Document;
using SautinSoft.Document.Tables;
using System;
using System.Collections.Generic;
using System.Text;

namespace API
{
    public class Contact
    {
        public Contact (XmlTag input)
        {
            foreach (XmlTag item in input.Childs)
            {
                if (item.Name == "text") Text = item.Text;
                if (item.Name == "link") Link = item.Text;
                if (item.Name == "image") Image = item.Text;
            }
        }

        public string Text;
        public string Link;
        public string Image;

        public Table GenerateContact(DocumentCore docx)
        {
            Table t = new Table(docx);
            t.TableFormat.PreferredWidth = new TableWidth(100, TableWidthUnit.Percentage);
            // Add 2 rows. 
            for (int r = 0; r < 2; r++)
            {
                TableRow row = new TableRow(docx);

                // Add 3 columns. 
                for (int c = 0; c < 3; c++)
                {
                    TableCell cell = new TableCell(docx);

                    // Set some cell formatting 
                    cell.CellFormat.Borders.SetBorders(MultipleBorderTypes.None, BorderStyle.None, Color.Auto, 0);
                    cell.CellFormat.PreferredWidth = new TableWidth(33, TableWidthUnit.Percentage);


                    row.Cells.Add(cell);



                    Hyperlink hpl = new Hyperlink(docx, contact[r * 2 + c].Link, contact[r * 2 + c].Text);
                    (hpl.DisplayInlines[0] as Run).CharacterFormat = new CharacterFormat() { Size = 11, FontName = "Calibri (Body)", FontColor = Color.Black, UnderlineStyle = UnderlineType.Single };

                    Paragraph p = new Paragraph(docx);
                    p.Inlines.Add(hpl);
                    p.ParagraphFormat.Alignment = HorizontalAlignment.Left;

                    cell.Blocks.Add(p);

                }
                t.Rows.Add(row);
            }
            return t;
        }
    }
}
