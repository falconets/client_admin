// import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
// import ReactDOM from 'react-dom';

// const CreateDialog = (dialog: any, fields: any, editAppointment: any) => {
//     // hide repeat option
//     fields.repeatContainer.hide();
//     // hide status option
//     fields.statusContainer.hide();
//     // hide timeZone option
//     fields.timeZoneContainer.hide();
//     // hide color option
//     fields.colorContainer.hide();
//     fields.subjectLabel.html("Title");
//     fields.locationLabel.html("Where");
//     fields.fromLabel.html("Start");
//     fields.toLabel.html("End");
//     fields.resourceLabel.html("Calendar");
//     const buttonContainer = document.createElement("div");
//     buttonContainer.style.cssFloat = 'right';
//     buttonContainer.style.marginLeft = '5px';
//     fields.buttons[0].appendChild(buttonContainer);
//     const printingFunction = (event: any) => {
//         const appointmentContent =
//             "<table class='printTable'>" +
//             "<tr>" +
//             "<td class='label'>Title</td>" +
//             "<td>" + fields.subject.val() + "</td>" +
//             "</tr>" +
//             "<tr>" +
//             "<td class='label'>Start</td>" +
//             "<td>" + fields.from.val() + "</td>" +
//             "</tr>" +
//             "<tr>" +
//             "<td class='label'>End</td>" +
//             "<td>" + fields.to.val() + "</td>" +
//             "</tr>" +
//             "<tr>" +
//             "<td class='label'>Where</td>" +
//             "<td>" + fields.location.val() + "</td>" +
//             "</tr>" +
//             "<tr>" +
//             "<td class='label'>Calendar</td>" +
//             "<td>" + fields.resource.val() + "</td>" +
//             "</tr>"
//             + "</table>";
//         const newWindow = window.open("", "", "width=800, height=500");
//         const document = newWindow!.document.open();
//         const pageContent =
//             '<!DOCTYPE html>\n' +
//             '<html>\n' +
//             '<head>\n' +
//             '<meta charset="utf-8" />\n' +
//             '<title>jQWidgets Scheduler</title>\n' +
//             '<style>\n' +
//             '.printTable {\n' +
//             'border-color: #aaa;\n' +
//             '}\n' +
//             '.printTable .label {\n' +
//             'font-weight: bold;\n' +
//             '}\n' +
//             '.printTable td{\n' +
//             'padding: 4px 3px;\n' +
//             'border: 1px solid #DDD;\n' +
//             'vertical-align: top;\n' +
//             '}\n' +
//             '</style>' +
//             '<script async src="https://www.googletagmanager.com/gtag/js?id=G-2FX5PV9DNT"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-2FX5PV9DNT');</script></head>\n' +
//             '<body>\n' + appointmentContent + '\n</body>\n</html>';
        
//         try {
//             document.write(pageContent);
//             document.close();
//         }
//         catch (error) {
//             // error handler
//         }
//         newWindow!.print();
//     }
//     const printButton = <JqxButton ref={printButton}
//         onClick={printingFunction}
//         width={40}
//         height={16}
//     >
//         Print
//     </JqxButton>;
//     ReactDOM.render(
//         printButton,
//         buttonContainer
//     );
// },