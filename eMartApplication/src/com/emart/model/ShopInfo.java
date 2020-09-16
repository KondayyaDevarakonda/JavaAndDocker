package com.emart.model;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

@WebService
@SOAPBinding(style = Style.RPC)
public class ShopInfo {

	@WebMethod
	@WebResult(partName = "lookupOutput")
	public String getShopInfo(@WebParam(partName = "lookupOutput") String property) {
		String response = "Invalid Property";
		
		if ("shopName".equals(property)) {
			response = "Test Mart";
		} else if ("since".equals(property)) {
			response = "Since 2014";
		}
		
		return response;
	}
}
