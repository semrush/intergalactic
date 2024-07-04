import React from 'react';
import Input from 'intergalactic/input';
import InputMask from 'intergalactic/input-mask';
import Select, { InputSearch } from 'intergalactic/select';
import NeighborLocation from 'intergalactic/neighbor-location';
import Flag from 'intergalactic/flags';
import { Text } from 'intergalactic/typography';
import CloseM from 'intergalactic/icon/Close/m';
import { Box, Flex } from 'intergalactic/flex-box';

const countries = {
  AF: { name: 'Afghanistan', prefix: '+93' },
  AX: { name: 'Åland Islands', prefix: '+358' },
  AL: { name: 'Albania', prefix: '+355' },
  DZ: { name: 'Algeria', prefix: '+213' },
  AS: { name: 'American Samoa', prefix: '+1684' },
  AD: { name: 'Andorra', prefix: '+376' },
  AO: { name: 'Angola', prefix: '+244' },
  AI: { name: 'Anguilla', prefix: '+1264' },
  AQ: { name: 'Antarctica', prefix: '+672' },
  AG: { name: 'Antigua and Barbuda', prefix: '+1268' },
  AR: { name: 'Argentina', prefix: '+54' },
  AM: { name: 'Armenia', prefix: '+374' },
  AW: { name: 'Aruba', prefix: '+297' },
  AU: { name: 'Australia', prefix: '+61' },
  AT: { name: 'Austria', prefix: '+43' },
  AZ: { name: 'Azerbaijan', prefix: '+994' },
  BS: { name: 'Bahamas', prefix: '+1242' },
  BH: { name: 'Bahrain', prefix: '+973' },
  BD: { name: 'Bangladesh', prefix: '+880' },
  BB: { name: 'Barbados', prefix: '+1246' },
  BY: { name: 'Belarus', prefix: '+375' },
  BE: { name: 'Belgium', prefix: '+32' },
  BZ: { name: 'Belize', prefix: '+501' },
  BJ: { name: 'Benin', prefix: '+229' },
  BM: { name: 'Bermuda', prefix: '+1441' },
  BT: { name: 'Bhutan', prefix: '+975' },
  BO: { name: 'Bolivia, Plurinational State of bolivia', prefix: '+591' },
  BA: { name: 'Bosnia and Herzegovina', prefix: '+387' },
  BW: { name: 'Botswana', prefix: '+267' },
  BV: { name: 'Bouvet Island', prefix: '+47' },
  BR: { name: 'Brazil', prefix: '+55' },
  IO: { name: 'British Indian Ocean Territory', prefix: '+246' },
  BN: { name: 'Brunei Darussalam', prefix: '+673' },
  BG: { name: 'Bulgaria', prefix: '+359' },
  BF: { name: 'Burkina Faso', prefix: '+226' },
  BI: { name: 'Burundi', prefix: '+257' },
  KH: { name: 'Cambodia', prefix: '+855' },
  CM: { name: 'Cameroon', prefix: '+237' },
  CA: { name: 'Canada', prefix: '+1' },
  CV: { name: 'Cape Verde', prefix: '+238' },
  KY: { name: 'Cayman Islands', prefix: '+ 345' },
  CF: { name: 'Central African Republic', prefix: '+236' },
  TD: { name: 'Chad', prefix: '+235' },
  CL: { name: 'Chile', prefix: '+56' },
  CN: { name: 'China', prefix: '+86' },
  CX: { name: 'Christmas Island', prefix: '+61' },
  CC: { name: 'Cocos (Keeling) Islands', prefix: '+61' },
  CO: { name: 'Colombia', prefix: '+57' },
  KM: { name: 'Comoros', prefix: '+269' },
  CG: { name: 'Congo', prefix: '+242' },
  CD: { name: 'Congo, The Democratic Republic of the Congo', prefix: '+243' },
  CK: { name: 'Cook Islands', prefix: '+682' },
  CR: { name: 'Costa Rica', prefix: '+506' },
  CI: { name: "Cote d'Ivoire", prefix: '+225' },
  HR: { name: 'Croatia', prefix: '+385' },
  CU: { name: 'Cuba', prefix: '+53' },
  CY: { name: 'Cyprus', prefix: '+357' },
  CZ: { name: 'Czech Republic', prefix: '+420' },
  DK: { name: 'Denmark', prefix: '+45' },
  DJ: { name: 'Djibouti', prefix: '+253' },
  DM: { name: 'Dominica', prefix: '+1767' },
  DO: { name: 'Dominican Republic', prefix: '+1849' },
  EC: { name: 'Ecuador', prefix: '+593' },
  EG: { name: 'Egypt', prefix: '+20' },
  SV: { name: 'El Salvador', prefix: '+503' },
  GQ: { name: 'Equatorial Guinea', prefix: '+240' },
  ER: { name: 'Eritrea', prefix: '+291' },
  EE: { name: 'Estonia', prefix: '+372' },
  ET: { name: 'Ethiopia', prefix: '+251' },
  FK: { name: 'Falkland Islands (Malvinas)', prefix: '+500' },
  FO: { name: 'Faroe Islands', prefix: '+298' },
  FJ: { name: 'Fiji', prefix: '+679' },
  FI: { name: 'Finland', prefix: '+358' },
  FR: { name: 'France', prefix: '+33' },
  GF: { name: 'French Guiana', prefix: '+594' },
  PF: { name: 'French Polynesia', prefix: '+689' },
  TF: { name: 'French Southern Territories', prefix: '+262' },
  GA: { name: 'Gabon', prefix: '+241' },
  GM: { name: 'Gambia', prefix: '+220' },
  GE: { name: 'Georgia', prefix: '+995' },
  DE: { name: 'Germany', prefix: '+49' },
  GH: { name: 'Ghana', prefix: '+233' },
  GI: { name: 'Gibraltar', prefix: '+350' },
  GR: { name: 'Greece', prefix: '+30' },
  GL: { name: 'Greenland', prefix: '+299' },
  GD: { name: 'Grenada', prefix: '+1473' },
  GP: { name: 'Guadeloupe', prefix: '+590' },
  GU: { name: 'Guam', prefix: '+1671' },
  GT: { name: 'Guatemala', prefix: '+502' },
  GG: { name: 'Guernsey', prefix: '+44' },
  GN: { name: 'Guinea', prefix: '+224' },
  GW: { name: 'Guinea-Bissau', prefix: '+245' },
  GY: { name: 'Guyana', prefix: '+592' },
  HT: { name: 'Haiti', prefix: '+509' },
  HM: { name: 'Heard Island and Mcdonald Islands', prefix: '+0' },
  VA: { name: 'Holy See (Vatican City State)', prefix: '+379' },
  HN: { name: 'Honduras', prefix: '+504' },
  HK: { name: 'Hong Kong', prefix: '+852' },
  HU: { name: 'Hungary', prefix: '+36' },
  IS: { name: 'Iceland', prefix: '+354' },
  IN: { name: 'India', prefix: '+91' },
  ID: { name: 'Indonesia', prefix: '+62' },
  IR: { name: 'Iran, Islamic Republic of Persian Gulf', prefix: '+98' },
  IQ: { name: 'Iraq', prefix: '+964' },
  IE: { name: 'Ireland', prefix: '+353' },
  IM: { name: 'Isle of Man', prefix: '+44' },
  IL: { name: 'Israel', prefix: '+972' },
  IT: { name: 'Italy', prefix: '+39' },
  JM: { name: 'Jamaica', prefix: '+1876' },
  JP: { name: 'Japan', prefix: '+81' },
  JE: { name: 'Jersey', prefix: '+44' },
  JO: { name: 'Jordan', prefix: '+962' },
  KZ: { name: 'Kazakhstan', prefix: '+7' },
  KE: { name: 'Kenya', prefix: '+254' },
  KI: { name: 'Kiribati', prefix: '+686' },
  KP: { name: "Korea, Democratic People's Republic of Korea", prefix: '+850' },
  KR: { name: 'Korea, Republic of South Korea', prefix: '+82' },
  XK: { name: 'Kosovo', prefix: '+383' },
  KW: { name: 'Kuwait', prefix: '+965' },
  KG: { name: 'Kyrgyzstan', prefix: '+996' },
  LA: { name: 'Laos', prefix: '+856' },
  LV: { name: 'Latvia', prefix: '+371' },
  LB: { name: 'Lebanon', prefix: '+961' },
  LS: { name: 'Lesotho', prefix: '+266' },
  LR: { name: 'Liberia', prefix: '+231' },
  LY: { name: 'Libyan Arab Jamahiriya', prefix: '+218' },
  LI: { name: 'Liechtenstein', prefix: '+423' },
  LT: { name: 'Lithuania', prefix: '+370' },
  LU: { name: 'Luxembourg', prefix: '+352' },
  MO: { name: 'Macao', prefix: '+853' },
  MK: { name: 'Macedonia', prefix: '+389' },
  MG: { name: 'Madagascar', prefix: '+261' },
  MW: { name: 'Malawi', prefix: '+265' },
  MY: { name: 'Malaysia', prefix: '+60' },
  MV: { name: 'Maldives', prefix: '+960' },
  ML: { name: 'Mali', prefix: '+223' },
  MT: { name: 'Malta', prefix: '+356' },
  MH: { name: 'Marshall Islands', prefix: '+692' },
  MQ: { name: 'Martinique', prefix: '+596' },
  MR: { name: 'Mauritania', prefix: '+222' },
  MU: { name: 'Mauritius', prefix: '+230' },
  YT: { name: 'Mayotte', prefix: '+262' },
  MX: { name: 'Mexico', prefix: '+52' },
  FM: { name: 'Micronesia, Federated States of Micronesia', prefix: '+691' },
  MD: { name: 'Moldova', prefix: '+373' },
  MC: { name: 'Monaco', prefix: '+377' },
  MN: { name: 'Mongolia', prefix: '+976' },
  ME: { name: 'Montenegro', prefix: '+382' },
  MS: { name: 'Montserrat', prefix: '+1664' },
  MA: { name: 'Morocco', prefix: '+212' },
  MZ: { name: 'Mozambique', prefix: '+258' },
  MM: { name: 'Myanmar', prefix: '+95' },
  NA: { name: 'Namibia', prefix: '+264' },
  NR: { name: 'Nauru', prefix: '+674' },
  NP: { name: 'Nepal', prefix: '+977' },
  NL: { name: 'Netherlands', prefix: '+31' },
  AN: { name: 'Netherlands Antilles', prefix: '+599' },
  NC: { name: 'New Caledonia', prefix: '+687' },
  NZ: { name: 'New Zealand', prefix: '+64' },
  NI: { name: 'Nicaragua', prefix: '+505' },
  NE: { name: 'Niger', prefix: '+227' },
  NG: { name: 'Nigeria', prefix: '+234' },
  NU: { name: 'Niue', prefix: '+683' },
  NF: { name: 'Norfolk Island', prefix: '+672' },
  MP: { name: 'Northern Mariana Islands', prefix: '+1670' },
  NO: { name: 'Norway', prefix: '+47' },
  OM: { name: 'Oman', prefix: '+968' },
  PK: { name: 'Pakistan', prefix: '+92' },
  PW: { name: 'Palau', prefix: '+680' },
  PS: { name: 'Palestinian Territory, Occupied', prefix: '+970' },
  PA: { name: 'Panama', prefix: '+507' },
  PG: { name: 'Papua New Guinea', prefix: '+675' },
  PY: { name: 'Paraguay', prefix: '+595' },
  PE: { name: 'Peru', prefix: '+51' },
  PH: { name: 'Philippines', prefix: '+63' },
  PN: { name: 'Pitcairn', prefix: '+64' },
  PL: { name: 'Poland', prefix: '+48' },
  PT: { name: 'Portugal', prefix: '+351' },
  PR: { name: 'Puerto Rico', prefix: '+1939' },
  QA: { name: 'Qatar', prefix: '+974' },
  RO: { name: 'Romania', prefix: '+40' },
  RU: { name: 'Russia', prefix: '+7' },
  RW: { name: 'Rwanda', prefix: '+250' },
  RE: { name: 'Reunion', prefix: '+262' },
  BL: { name: 'Saint Barthelemy', prefix: '+590' },
  SH: { name: 'Saint Helena, Ascension and Tristan Da Cunha', prefix: '+290' },
  KN: { name: 'Saint Kitts and Nevis', prefix: '+1869' },
  LC: { name: 'Saint Lucia', prefix: '+1758' },
  MF: { name: 'Saint Martin', prefix: '+590' },
  PM: { name: 'Saint Pierre and Miquelon', prefix: '+508' },
  VC: { name: 'Saint Vincent and the Grenadines', prefix: '+1784' },
  WS: { name: 'Samoa', prefix: '+685' },
  SM: { name: 'San Marino', prefix: '+378' },
  ST: { name: 'Sao Tome and Principe', prefix: '+239' },
  SA: { name: 'Saudi Arabia', prefix: '+966' },
  SN: { name: 'Senegal', prefix: '+221' },
  RS: { name: 'Serbia', prefix: '+381' },
  SC: { name: 'Seychelles', prefix: '+248' },
  SL: { name: 'Sierra Leone', prefix: '+232' },
  SG: { name: 'Singapore', prefix: '+65' },
  SK: { name: 'Slovakia', prefix: '+421' },
  SI: { name: 'Slovenia', prefix: '+386' },
  SB: { name: 'Solomon Islands', prefix: '+677' },
  SO: { name: 'Somalia', prefix: '+252' },
  ZA: { name: 'South Africa', prefix: '+27' },
  SS: { name: 'South Sudan', prefix: '+211' },
  GS: { name: 'South Georgia and the South Sandwich Islands', prefix: '+500' },
  ES: { name: 'Spain', prefix: '+34' },
  LK: { name: 'Sri Lanka', prefix: '+94' },
  SD: { name: 'Sudan', prefix: '+249' },
  SR: { name: 'Suriname', prefix: '+597' },
  SJ: { name: 'Svalbard and Jan Mayen', prefix: '+47' },
  SZ: { name: 'Swaziland', prefix: '+268' },
  SE: { name: 'Sweden', prefix: '+46' },
  CH: { name: 'Switzerland', prefix: '+41' },
  SY: { name: 'Syrian Arab Republic', prefix: '+963' },
  TW: { name: 'Taiwan', prefix: '+886' },
  TJ: { name: 'Tajikistan', prefix: '+992' },
  TZ: { name: 'Tanzania, United Republic of Tanzania', prefix: '+255' },
  TH: { name: 'Thailand', prefix: '+66' },
  TL: { name: 'Timor-Leste', prefix: '+670' },
  TG: { name: 'Togo', prefix: '+228' },
  TK: { name: 'Tokelau', prefix: '+690' },
  TO: { name: 'Tonga', prefix: '+676' },
  TT: { name: 'Trinidad and Tobago', prefix: '+1868' },
  TN: { name: 'Tunisia', prefix: '+216' },
  TR: { name: 'Turkey', prefix: '+90' },
  TM: { name: 'Turkmenistan', prefix: '+993' },
  TC: { name: 'Turks and Caicos Islands', prefix: '+1649' },
  TV: { name: 'Tuvalu', prefix: '+688' },
  UG: { name: 'Uganda', prefix: '+256' },
  UA: { name: 'Ukraine', prefix: '+380' },
  AE: { name: 'United Arab Emirates', prefix: '+971' },
  GB: { name: 'United Kingdom', prefix: '+44' },
  US: { name: 'United States', prefix: '+1' },
  UY: { name: 'Uruguay', prefix: '+598' },
  UZ: { name: 'Uzbekistan', prefix: '+998' },
  VU: { name: 'Vanuatu', prefix: '+678' },
  VE: { name: 'Venezuela, Bolivarian Republic of Venezuela', prefix: '+58' },
  VN: { name: 'Vietnam', prefix: '+84' },
  VG: { name: 'Virgin Islands, British', prefix: '+1284' },
  VI: { name: 'Virgin Islands, U.S.', prefix: '+1340' },
  WF: { name: 'Wallis and Futuna', prefix: '+681' },
  YE: { name: 'Yemen', prefix: '+967' },
  ZM: { name: 'Zambia', prefix: '+260' },
  ZW: { name: 'Zimbabwe', prefix: '+263' },
};

const Demo = () => {
  const inputRef = React.useRef(null);
  const [countryFilter, setCountryFilterValue] = React.useState('');
  const [country, setCountry] = React.useState<keyof typeof countries>('ZW');
  const prefix = countries[country].prefix;
  const [phoneNumber, setPhoneNumber] = React.useState(prefix);
  const [phoneMask, setPhoneMask] = React.useState(`${prefix} (___)___-____`);

  return (
    <Flex direction='column'>
      <Text tag='label' htmlFor='phone-number-with-country-select' size={200} mr={2}>
        Phone number
      </Text>
      <Box mt={2}>
        <NeighborLocation controlsLength={2}>
          <Select
            value={country}
            onChange={(country) => {
              setCountry(country);
              const prefix = countries[country].prefix;
              setPhoneNumber(prefix);
              setPhoneMask(`${prefix} (___)___-____`);
              setTimeout(() => {
                inputRef?.current.focus();
              }, 1);
            }}
          >
            <Select.Trigger>
              <Select.Trigger.Addon mr={0}>
                <Flag iso2={country} />
              </Select.Trigger.Addon>
            </Select.Trigger>

            <Select.Popper>
              <>
                <InputSearch
                  placeholder='Search'
                  value={countryFilter}
                  onChange={setCountryFilterValue}
                />

                <Select.List hMax='240px' w='232px'>
                  {Object.keys(countries)
                    .filter((country) =>
                      countries[country].name.toLowerCase().includes(countryFilter),
                    )
                    .map((country) => (
                      <Select.Option key={country} value={country}>
                        <Text size={200} mr={2} flex='0 0 auto'>
                          <Flag iso2={country as keyof typeof countries} />
                        </Text>
                        <Text size={200} mr={2}>
                          {countries[country].name}
                        </Text>
                        <Text size={200} color='text-secondary'>
                          {countries[country].prefix}
                        </Text>
                      </Select.Option>
                    ))}
                </Select.List>
              </>
            </Select.Popper>
          </Select>
          <InputMask w={210}>
            <InputMask.Value
              title={'phone number'}
              id='phone-number-with-country-select'
              ref={inputRef}
              value={phoneNumber}
              onChange={setPhoneNumber}
              mask={phoneMask.replace(/_/g, '9')}
            />
            {phoneNumber !== phoneMask && (
              <Input.Addon
                tag={CloseM}
                aria-label='Clear'
                interactive
                onClick={() => setPhoneNumber(prefix)}
              />
            )}
          </InputMask>
        </NeighborLocation>
      </Box>
    </Flex>
  );
};

export default Demo;
