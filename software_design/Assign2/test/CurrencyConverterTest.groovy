import static org.junit.Assert.*
import groovy.util.GroovyTestCase
import org.junit.Test

class CurrencyConverterTest extends GroovyTestCase
{
	def converter
		
	protected void setUp()
	{
		converter = new CurrencyConverter()
	}
	
	@Test
	void testCanary() 
	{
		assert true
	}
	
	@Test
	void testGetHighestRate()
	{
		def allVendorsAndRates = [v1:70.00, v2:80.00, v3:90.00]
		assert ['v3', 90.00] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning the highest vendor and rate'
	}
	
	@Test
	void testToPickFirstVendorWhen2VendorsHaveSameHighestRate()
	{
		def allVendorsAndRates = [v1:70.00, v2:90.00, v3:90.00]
		assert ['v2', 90.00] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning the highest vendor when' + 
					'there are two same max rates'
	}
	
	@Test
	void testToPickFirstVendorWhenAllVendorsHaveTheSameHighestRate()
	{
		def allVendorsAndRates = [v1:90.00, v2:90.00, v3:90.00]
		assert ['v1', 90.00] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning the highest vendor when' + 
					'all vendors have same max rates'
	}
	
	@Test
	void testToGetHighestRateWhenSomeVendorsHaveNegativeValues()
	{
		def allVendorsAndRates = [v1:-70.00, v2:80.00, v3:-90.00]
		assert ['v2', 80.00] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning the highest vendor when' +
					 'there are negative values'
	}
	
	@Test
	void testToGetHighestRateWhenAllVendorsHaveNegativeValues()
	{
		def allVendorsAndRates = [v1:-70.00, v2:-80.00, v3:-90.00]		
		assert ['', 0.0] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning Zero for negative values' + 
					'for all Vendors'
	}
	
	@Test
	void testToCheckHighestRateWhenAllVendorsHaveZeroValues()
	{
		def allVendorsAndRates = [v1:0.00, v2:0.00, v3:0.00]
		assert ['', 0.0] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning the correct value for' + 
					'Zero value for all Vendors'
	}
	
	@Test
	void testGetHighestRateWhenThereAreNoVendors()
	{
		def allVendorsAndRates = [:]
		assert ['', 0.0] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning the correct value for' + 
					'Zero value for all Vendors'
	}
	
	@Test
	void testGetHighestRateWhenThereIsOnlyOneVendor()
	{
		def allVendorsAndRates = [v1:100.00]
		assert ['v1', 100.0] ==
			converter.getHighestRate(allVendorsAndRates):
				'One Vendor Case Failed'
	}
	
	@Test
	void testGetHighestRateWithSomeVendorsHavingNullValues()
	{
		def allVendorsAndRates = [v1:null, v2:80.00, v3:-90.00]
		assert ['v2', 80.0] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning the correct value for' + 
					'a Vendor wih null value'
	}
	
	@Test
	void testGetHighestRateWithAllVendorsHavingNullValues()
	{
		def allVendorsAndRates = [v1:null, v2:null, v3:null]
		assert ['', 0.0] == 
			converter.getHighestRate(allVendorsAndRates):
				'Not returning the correct value for' + 
					'all Vendors having Null Values'
	}
	
	@Test
	void testGetMarkedUpRate()
	{
		assert 98.00 == converter.getMarkedUpRate(100.00):
			'Error in getting the correct Markedup Value'		
	}
	
	@Test
	void testMarkedUpRateForZeroValuePassed()
	{
		assert 0.0 == converter.getMarkedUpRate(0):
			'Wrong Mark Up Value when Zero is passed'
	}
	
	@Test
	void testToSkipNullAndWhitespaceVendors()
	{
		converter = new CurrencyConverter(['v1', '', null])
		converter.metaClass.getExchangeRateFromWebService =
			{ currency, vendor -> 200.00 }
		assert ['v1', 196] == converter.getRate('INR')
		
	}
	
	@Test
	void testWebServiceForNullValuesOfVendorAndCurrency()
	{
		assert 0 == 
			converter.getExchangeRateFromWebService(null, null)
		
	}
		
	@Test
	void testProperURLStringGeneration()
	{
		assert 'http://agile.cs.uh.edu/rate?cur=GBP&vendor=v1' ==
			converter.generateURLString('GBP', 'v1') :
				'improper URL String generation'
	}
	
	@Test
	void testURLStringGenerationForANullValueOfCurrency()
	{
		assert null ==
			converter.generateURLString(null, 'v1') :
				'improper URL String generation'
	}
	
	@Test
	void testGetRateForNullValuesOfVendorAndCurrency()
	{
		converter = new CurrencyConverter([null])
		assert 0 == converter.getRate(null)[1]
	}
	
	@Test
	void testGetRateForEmptyValuesOfVendorAndCurrency()
	{
		converter = new CurrencyConverter([''])
		assert 0 == converter.getRate('')[1]
	}
	
	@Test
	void testGetRateForObjectInVendor()
	{
		def date = new Date()
		converter = new CurrencyConverter(['', date])
		assert null != converter.getRate('BLG')[0]
	}
	
	@Test
	void testGetRateForVendorNameNotNull()
	{
		converter = new CurrencyConverter(['v1', 'v4', 'Hello'])
		assert null != converter.getRate('INR')[0]
	}
	
	@Test
	void testGetURLForADifferentURL()
	{	 
		assert 0 == converter.getURLText('http://www.google.com/')
	}
}

