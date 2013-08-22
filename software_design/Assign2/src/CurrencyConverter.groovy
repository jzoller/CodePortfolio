class CurrencyConverter
{
	def vendorList	
	CurrencyConverter()
	{
	
	}
	
	CurrencyConverter(_vendorList) 
	{
		vendorList = _vendorList.unique();
	}

	def getRate(currency)
	{
		def allVendorsAndRates = [:]
		for (String vendor : vendorList)
		if(vendor != null && !vendor.isAllWhitespace())
			allVendorsAndRates[vendor] =
				getExchangeRateFromWebService(currency, vendor)
				
		def (highestVendor, highestRate) = 
			getHighestRate(allVendorsAndRates)
		[highestVendor, getMarkedUpRate(highestRate)]
	}
	
	def getExchangeRateFromWebService(currency, vendor) 
	{
		getURLText(generateURLString(currency, vendor)).toDouble()
	}

	
	def getHighestRate(allVendorsAndRates)
	{
		def highestRate = 0
		def highestVendor =''
		allVendorsAndRates.each
		{
			key, value -> if(value > highestRate)
			{
				(highestRate, highestVendor) = [value, key]
			}
		}
		[highestVendor, highestRate]
	}
	
	def getMarkedUpRate(highestRate)
	{
		highestRate * 0.98          
	}
	
	
	def generateURLString(currency, vendor)
	{
		if(currency != null && !(currency.isAllWhitespace()))
			'http://agile.cs.uh.edu/rate?cur=' + currency + 
				'&vendor=' + vendor
		else
			null
	}
	
	def getURLText(urlString)
	{
		def result
		try
		{
			result = new URL(urlString).text
		}
		catch(Throwable webException)
		{
			result = 'Problem in the Web Service'
		}
		if(result.isNumber())
			result
		else
			0
	}
}