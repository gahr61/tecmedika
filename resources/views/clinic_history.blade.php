<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Reporte pagares</title>
    <style type="text/css">
        @page {
            margin: 1.5cm;
        }

        body {
            font-family: sans-serif;
            margin: 0.5cm 0;
            text-align: justify;
            font-size: 8;
        }

        #header,
        #footer {
            position: fixed;
            left: 0;
            right: 0;
            color: #aaa;
            font-size: 0.9em;
        }

        #header {
            top: 0;
            border-bottom: 0.1pt solid #aaa;
        }

        #footer {
            bottom: 0;
            border-top: 0.1pt solid #aaa;
        }
        
        #header table,
        #footer table {
            width: 100%;
            border-collapse: collapse;
            border: none;
        }

        #header td,
        #footer td {
            padding: 0;
            width: 50%;
        }

        .page-number {
            text-align: center;
        }
        
        .page-number:before {
            content: "Pagina " counter(page);
        }

        hr{
            page-break-after:always;
            border: 0;
        }

        .pagare{
            width:100%;
        }


        .datos td{
            border-top: 1px solid #ddd;
        }

        th{
            text-align:left;
        }
        
    </style>
</head>
<body>
    <div id="header">
        <table >
            <tr>
                <td>Historia Clínica</td>
                <td style="text-align:center;">{{ $clinic_history->date }}</td>
                <td style="text-align: right;">Tec-Médika</td>
                
            </tr>
        </table>
    </div>

    <br>

    <div id="data" style="">
        <table style="width:100%;">
            <thead>
                <tr>
                    <th>Paciente</th>
                    <th>Doctor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <span>{{$clinic_history->patient_names.' '.$clinic_history->patient_lastname1.(is_null($clinic_history->patient_lastname2) ? '' : ' '.$clinic_history->patient_lastname2)}}</span>
                    </td>
                    <td>
                        <span>{{$clinic_history->doctor_names.' '.$clinic_history->doctor_lastname1.(is_null($clinic_history->doctor_lastname2) ? '' : ' '.$clinic_history->doctor_lastname2)}}</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div style="border-top:0.5px solid; width:100%;margin-top:3px; margin-bottom:3px;"></div>

        <table style="width:100%;">
            <thead>
                <tr>
                    <th colspan="3">Historia clínica</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>Peso</strong> <span>{{$clinic_history->weight}}</span>
                    </td>
                    <td>
                        <strong>Altura</strong> <span>{{$clinic_history->height}}</span>
                    </td>
                    <td>
                        <strong>Razón de visita</strong> <span>{{$clinic_history->visit_reason}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Diagnostico</strong> <span>{{$clinic_history->diagnosis}}</span>
                    </td>
                    <td>
                        <strong>Tratamiento</strong> <span>{{$clinic_history->treatment}}</span>
                    </td>
                    <td>
                        <strong>Notas</strong> <span>{{$clinic_history->notes}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    

    

    <div id="footer">
        <div class="page-number"></div>
    </div>
</body>
</html>