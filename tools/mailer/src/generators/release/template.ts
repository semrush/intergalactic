export const template = (date: string, name: string, text: string) => {
  return (
    '<style type="text/css">@media only screen{html{min-height:100%;background:#fff}}@media only screen and (max-width:632px){table.body img{width:auto;height:auto}table.body center{min-width:0!important}table.body .container{width:95%!important}table.body .columns{height:auto!important;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:32px!important;padding-right:32px!important}table.body .columns .columns{padding-left:0!important;padding-right:0!important}th.small-3{display:inline-block!important;width:25%!important}th.small-9{display:inline-block!important;width:75%!important}th.small-12{display:inline-block!important;width:100%!important}.columns th.small-12{display:block!important;width:100%!important}}@media only screen and (max-width:632px){th.small-3.large-3.columns.first{padding-right:0!important}h1{font-size:22px!important;line-height:1.15}h2{font-size:20px!important;line-height:1.15}h3{font-size:16px!important;line-height:1.25}}\n' +
    '</style>\n' +
    '<table class="body" style="Margin:0;background:#fff!important;border-collapse:collapse;border-spacing:0;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t<tbody>\n' +
    '\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t<td align="center" class="center" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word" valign="top">\n' +
    '\t\t\t<center style="min-width:600px;width:100%">\n' +
    '\t\t\t<table align="center" class="container float-center" style="Margin:0 auto;background:#fff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;width:600px">\n' +
    '\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t<td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t<td height="40" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:40px;font-weight:400;hyphens:auto;line-height:40px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t<table class="row header" style="background:#421983;border-collapse:collapse;border-radius:10px;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t<th class="small-12 large-12 columns first last" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:32px;padding-right:32px;padding-top:0;text-align:left;vertical-align:top;width:568px;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="46" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:46px;font-weight:400;hyphens:auto;line-height:46px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<center style="min-width:504px;width:100%"><img data-file-id="5127614" height="22" src="https://mcusercontent.com/eb0895e43f38beb026f1781b2/images/6d892c13-c2e6-4e18-b2d6-47e98f43ff22.png" style="border: 0px  ; width: 312px; height: 22px; margin: 0px;" width="312"/></center>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="36" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:36px;font-weight:400;hyphens:auto;line-height:36px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<center style="min-width:504px;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<h1 align="center" class="float-center" style="Margin:0;Margin-bottom:8px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:32px;font-weight:700;line-height:1.4;margin:0;margin-bottom:8px;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;word-wrap:normal"> New' +
    ' ' +
    name +
    ' ' +
    ' release <br/>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t from' +
    ' ' +
    date +
    ' ' +
    'is here!</h1>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</center>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<center style="min-width:504px;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<p align="center" class="float-center" large="12" small="12" style="Margin:0;Margin-bottom:0;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;margin-bottom:0;padding-bottom:24px;padding-left:0;padding-right:0;padding-top:0;text-align:center">Dear friend, we have a new release for Intergalactic<br/>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\tcomponents with the following improvements and changes.</p>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</center>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="row" style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th class="small-12 large-6 columns first last" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:0!important;padding-right:0!important;padding-top:0;text-align:left;vertical-align:top;width:50%;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<center style="min-width:none!important;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class="button large radius float-center" style="Margin:0 0 40px 0;border-collapse:collapse;border-radius:6px;border-spacing:0;float:none;margin:0 0 40px 0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;white-space:nowrap;width:auto;height:50px">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;background:#FF622D;border:none;border-collapse:collapse!important;border-radius:6px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word"><a align="center" href="https://i.semrush.com/internal/release/release-changelog/" style="border:0 solid #FF622D;border-radius:6px;color:#fff;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;padding:13px 64px;text-align:left;text-decoration:none" target="_blank">Dive into changelog</a></td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</center>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t</table>\n' +
    '\n' +
    '\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t<td height="20" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:400;hyphens:auto;line-height:20px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\n' +
    '\n' +
    text +
    '\t\t\t\t\t\t<table class="row" style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t<th class="small-12 large-12 columns first last" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:32px;padding-right:32px;padding-top:0;text-align:left;vertical-align:top;width:568px;word-wrap:break-word">&nbsp;</th>\n' +
    '\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\n' +
    '\n' +
    '\t\t\t\t\t\t<table class="row" style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t<th>\n' +
    '\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="8" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:8px;font-weight:400;hyphens:auto;line-height:8px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="button large radius" style="Margin:0 0 40px 0;border-collapse:collapse;border-radius:6px;border-spacing:0;margin:0 0 40px 0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;white-space:nowrap;width:auto;height:50px">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;background:#FF622D;border:none;border-collapse:collapse!important;border-radius:6px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word"><a href="https://i.semrush.com/internal/release/release-changelog/" style="border:0 solid #FF622D;border-radius:6px;color:#fff;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;padding:13px 64px;text-align:left;text-decoration:none" target="_blank">Dive into changelog</a></td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t</table>\n' +
    '\n' +
    '\t\t\t\t\t\t<table class="row callout" style="Margin-bottom:40px;background:#F6F7F8;border-collapse:collapse;border-radius:10px;border-spacing:0;display:table;margin-bottom:40px;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t<th class="small-12 large-12 columns first last" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:32px;padding-right:32px;padding-top:0;text-align:left;vertical-align:top;width:568px;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="24" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;hyphens:auto;line-height:24px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<h3 style="Margin:0;Margin-bottom:8px;color:inherit;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;line-height:1.6;margin:0;margin-bottom:8px;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;word-wrap:normal">Frequency of updates?</h3>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<p style="Margin:0;Margin-bottom:0;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;margin-bottom:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left">The release cycle is 2 weeks. Every two weeks we collect all changes for all packages, lift and commit the corresponding versions, write a changelog and publish all of them. <a href="https://i.semrush.com/internal/release/" style="color:#0082E5;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.5;padding:0;text-align:left;text-decoration:underline" target="_blank">Learn more about our release system</a></p>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="24" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;hyphens:auto;line-height:24px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding:0!important;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;visibility:hidden;width:0;word-wrap:break-word">&nbsp;</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t</table>\n' +
    '\n' +
    '\t\t\t\t\t\t<table class="row feedback" style="background:#421983;border-collapse:collapse;border-radius:10px;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t<th class="small-3 large-3 columns first" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:32px;padding-right:16px;padding-top:0;text-align:left;vertical-align:top;width:118px;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="16" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:16px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<img data-file-id="5127610" height="108" src="https://mcusercontent.com/eb0895e43f38beb026f1781b2/images/0dbdc671-58d5-4760-acc7-2aa341bcea76.png" style="border: 0px  ; width: 114px; height: 108px; margin: 0px;" width="114"/>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="24" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;hyphens:auto;line-height:24px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t<th class="small-9 large-9 columns last" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:16px;padding-right:32px;padding-top:0;text-align:left;vertical-align:top;width:418px;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="26" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:26px;font-weight:400;hyphens:auto;line-height:26px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<h2 style="Margin:0;Margin-bottom:8px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:26px;font-weight:700;line-height:1.2;margin:0;margin-bottom:8px;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;word-wrap:normal">Need help?</h2>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<p style="Margin:0;Margin-bottom:0;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;margin-bottom:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left">Contact us by email:<br/>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<a href="mailto:ui-kit-team@semrush.com" style="color:#fff;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.5;padding:0;text-align:left;text-decoration:underline">ui-kit-team@semrush.com</a></p>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="24" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;hyphens:auto;line-height:24px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t<table align="center" class="wrapper footer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t<td class="wrapper-inner" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<td height="40" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:40px;font-weight:400;hyphens:auto;line-height:40px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t<table class="row" style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th class="small-12 large-12 columns first last" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:32px;padding-right:32px;padding-top:0;text-align:left;vertical-align:top;width:568px;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="Margin:0;Margin-bottom:0;color:#575C66;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.35;margin:0;margin-bottom:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left"><strong>Semrush.com</strong> reports and tools are used by the world&rsquo;s smartest site owners and online-marketers. Semrush Inc., USA, 800 Boylston Street, Suite 2475, Boston, MA 02199</p>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="16" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:16px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding:0!important;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;visibility:hidden;width:0;word-wrap:break-word">&nbsp;</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t<table class="row" style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th class="small-12 large-12 columns first last" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:32px;padding-right:32px;padding-top:0;text-align:left;vertical-align:top;width:568px;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word"><a href="https://www.semrush.com/company/legal/privacy-policy/" style="color:#575C66;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.35;padding:0;text-align:left;text-decoration:underline" target="_blank">Privacy policy</a> | <a href="#" style="color:#575C66;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.35;padding:0;text-align:left;text-decoration:underline">View in Browser</a> | <a href="#" style="color:#575C66;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.35;padding:0;text-align:left;text-decoration:underline" target="_blank">Unsubscribe</a>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td height="16" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:16px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding:0!important;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;visibility:hidden;width:0;word-wrap:break-word">&nbsp;</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t<table class="row" style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;position:relative;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<th class="small-12 large-12 columns first last" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0 auto;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0 auto;padding-bottom:0;padding-left:32px;padding-right:32px;padding-top:0;text-align:left;vertical-align:top;width:568px;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="Margin:0;Margin-bottom:0;color:#575C66;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.35;margin:0;margin-bottom:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left">Copyright &copy; Semrush, All rights reserved.</p>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.5;margin:0;padding:0!important;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;visibility:hidden;width:0;word-wrap:break-word">&nbsp;</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</th>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t<table class="spacer" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n' +
    '\t\t\t\t\t\t\t\t\t\t<tbody>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t<tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<td height="40" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#171A22;font-family:Helvetica,Arial,sans-serif;font-size:40px;font-weight:400;hyphens:auto;line-height:40px;margin:0;mso-line-height-rule:exactly;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t</tbody>\n' +
    '\t\t\t\t\t\t</table>\n' +
    '\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t</tr>\n' +
    '\t\t\t\t</tbody>\n' +
    '\t\t\t</table>\n' +
    '\t\t\t</center>\n' +
    '\t\t\t</td>\n' +
    '\t\t</tr>\n' +
    '\t</tbody>\n' +
    '</table>\n' +
    '<!-- prevent Gmail on iOS font size manipulation -->\n' +
    '\n' +
    '<div style="display:none;white-space:nowrap;font:16px courier;line-height:0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>\n'
  );
};
