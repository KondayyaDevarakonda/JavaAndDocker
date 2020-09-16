package org.soap.webservices;

import org.oorsprong.websamples.CountryInfoService;
import org.oorsprong.websamples.CountryInfoServiceSoapType;


public class PostCodeFinder {
//http://wsf.cdyne.com/WeatherWS/Weather.asmx?WSDL
	public static void main(String[] args) {
		// TODO Auto-generated method stub
				
		if (args.length != 1) {
			System.out.println("You need to pass argument");
		} else {
			String sCountryISOCode = args[0];
			
			CountryInfoService countryInfoService = new CountryInfoService();
			CountryInfoServiceSoapType countryInfoServiceSoap = countryInfoService.getCountryInfoServiceSoap();
			String countryName = countryInfoServiceSoap.countryName(sCountryISOCode);
			System.out.println(countryName);
		}

	}

}
