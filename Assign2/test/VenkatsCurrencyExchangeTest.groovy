//package assign2

class VenkatsCurrencyExchangeTest extends spock.lang.Specification {
  final double DELTA = 0.0000000001
  
  def "test Canary"() {
    expect:
      true == true
  }  

  def createSampleVendorsAndRate() {
    ["Vendor1" : 1.0, "Vendor2" : 10.0, "Vendor3" : 9.0,]
  }
  
  def "test Pick Highest Rate And Vendor"() {
    def vendorNamesAndRates = createSampleVendorsAndRate()
    def result = pickHighestRateAndVendor(vendorNamesAndRates)
    expect:
      "Vendor2" == result[0]
      10.0 == result[1]
  }

  def "test Pick Highest Rate And Vendor Duplicate Vendors"() {
    def vendorNamesAndRates = createSampleVendorsAndRate()
    vendorNamesAndRates["Vendor2"] = 14.0
    def result = pickHighestRateAndVendor(vendorNamesAndRates)
    expect:
      "Vendor2" == result[0]
      14.0 == result[1]
  }

  def "test Pick Highest Rate And Vendor Duplicate Rates"() {
      def vendorNamesAndRates = createSampleVendorsAndRate()
      vendorNamesAndRates["Vendor4"] = 10.0
      def result = pickHighestRateAndVendor(vendorNamesAndRates)
      expect:
        "Vendor2" == result[0]
        10.0 == result[1]
    }

  def "test Pick Highest Rate And Vendor Zero Rates"() {
    def vendorNamesAndRates = createSampleVendorsAndRate()
    vendorNamesAndRates["Vendor1"] = 0.0
    vendorNamesAndRates["Vendor2"] = 0.0
    vendorNamesAndRates["Vendor3"] = 0.0
    def result = pickHighestRateAndVendor(vendorNamesAndRates)
    expect:
      "" == result[0]
      0.0 == result[1]
  }

  def "test Pick Highest Rate And Vendor One Negative Rates"() {
    def vendorNamesAndRates = createSampleVendorsAndRate()
    vendorNamesAndRates["Vendor4"] = -30.0
    def result = pickHighestRateAndVendor(vendorNamesAndRates)
    expect:
      "Vendor2" == result[0]
      10.0 == result[1]
  }

  def "test Pick Highest Rate And Vendor Negative Rates"() {
    def vendorNamesAndRates = createSampleVendorsAndRate()
    vendorNamesAndRates["Vendor1"] = -1.0
    vendorNamesAndRates["Vendor2"] = -2.0
    vendorNamesAndRates["Vendor3"] = -3.0
    def result = pickHighestRateAndVendor(vendorNamesAndRates)
    expect:
      "" == result[0]
      0.0 == result[1]
  }

  def "test Pick Highest Rate And Vendor No Vendors"() {
    def vendorNamesAndRates = [:]
    def result = pickHighestRateAndVendor(vendorNamesAndRates)
    expect:
      "" == result[0]
      0.0 == result[1]
  }

  def "testPick Highest Rate And Vendor Empty Vendor Name"() {
    def vendorNamesAndRates = createSampleVendorsAndRate()
    vendorNamesAndRates[""] = 14.0
    def result = pickHighestRateAndVendor(vendorNamesAndRates)
    expect:
      "Vendor2" == result[0]
      10.0 == result[1]
  }

  def "test Adjusted Rate"() {
    expect:
      9.8 == adjustedRate(10.0)
  }

  def "test Adjusted High Rate No Vendors"() {
    def result = adjustedHighRate()
    expect:
      "" == result[0]
      0.0 == result[1]
  }
  
  def "test Adjusted High Rate With One Vendor"() {
    def result = adjustedHighRate("GamaInternational")
    expect:
      "GamaInternational" == result[0]
      2.94 == result[1]
  }

  def "test Adjusted High Rate With Two Vendors"() {
    def result = adjustedHighRate("GamaInternational", "BetaInternational")
    expect:
      "BetaInternational" == result[0]
      3.92 == result[1]
  }
  
  def "test Adjusted High Rate With Three Vendors"() {
    def result = adjustedHighRate(
      "GamaInternational", "AlphaInternational", "BetaInternational")
    expect:
      "AlphaInternational" == result[0]
      4.90 == result[1]
  }

  def "test Adjusted High Rate With Four Vendors"() {
    def result = adjustedHighRate(
      "GamaInternational", "AlphaInternational", 
      "BetaInternational", "MinusInternational")
    expect:
      "AlphaInternational" == result[0]
      4.90 == result[1]
  }

  def "test Adjusted High Rate With Five Vendors"() {
    def result = adjustedHighRate(
      "GamaInternational", "AlphaInternational", 
      "BetaInternational", "MinusInternational", "ErrInternational")
    expect:
      "AlphaInternational" == result[0]
      4.90 == result[1]
  }

  def "test Adjusted High Rate With Six Vendors"() {
    def result = adjustedHighRate(
      "GamaInternational", "AlphaInternational", 
      "BetaInternational", "MinusInternational", 
      "ErrInternational", "FiveInternational")
    expect:
      "AlphaInternational" == result[0]
      4.90 == result[1]
  }

  def "test Adjusted High Rate Duplicate Vendor"() {
    def result = adjustedHighRate(
      "AlphaInternational", "AlphaInternational", 
      "BetaInternational")
    expect:
      "AlphaInternational" == result[0]
      4.90 == result[1]
  }

  def "test Adjusted High Rate Duplicate Vendor Non High"() {
    def result = adjustedHighRate(
      "AlphaInternational", "BetaInternational", 
      "BetaInternational")
    expect:
      "AlphaInternational" == result[0]
      4.90 == result[1]
  }

  def "test Adjusted High Rate With Five International"() {
    def result = adjustedHighRate("FiveInternational")
    expect:
      "" == result[0]
      0.0 == result[1]
  }

////////////////////////////////////////////////////////////////
//  //Mapping of tests to code written by individual pairs
//  
    def _currencyExchange

    def setup() {
    _currencyExchange = new CurrencyConverter([])
  }

  def adjustedRate(double rate) {
    _currencyExchange.getMarkedUpRate(rate)
  }
    
  def pickHighestRateAndVendor(vendorNamesAndRates) {
      _currencyExchange.getHighestRate(vendorNamesAndRates)
  }

  def adjustedHighRate(String[] vendorNames) {
    def currencyExchange = 
      new CurrencyConverter(vendorNames.toList())
    currencyExchange.getRate("GBP")
  }
}
