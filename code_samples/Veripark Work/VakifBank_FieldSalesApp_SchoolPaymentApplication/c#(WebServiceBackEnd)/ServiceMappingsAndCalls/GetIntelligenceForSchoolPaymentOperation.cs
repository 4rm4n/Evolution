using System;
using VakifBank.DSA.YHB.MobileApi.Adapters.Providers;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;
using VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis;
using VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatisServiceReference;
using VeriPark.MobileApi.Contracts;
using System.Collections.Generic;

namespace VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatis
{
    public class GetIntelligenceForSchoolPaymentOperation : BaseAdapterOperation, IFetchAdaptorOperation<GetIntelligenceForSchoolPaymentRequest, GetIntelligenceForSchoolPaymentResponse>
    {
        public GetIntelligenceForSchoolPaymentResponse Dispatch(Header header, GetIntelligenceForSchoolPaymentRequest request, out Footer footer)
        {
            var response = new GetIntelligenceForSchoolPaymentResponse();
            try
            {
                var serviceRequest = SOkulTahsilatMobilSahaSatisServiceProvider.GenerateRequest<IstihbaratTalep>(header);
                serviceRequest.TcKimlikNo = request.IdentityNo;
                serviceRequest.MusteriNo = request.CustomerNo;
                var serviceResponse = Loggers.Performance.ExecuteMeasure(() => GetIntelligenceDispatch(serviceRequest));
                footer = SOkulTahsilatMobilSahaSatisServiceProvider.ConstructFooter(serviceResponse);
                MapServiceResponse(serviceResponse, response);
                if (!footer.IsSuccess)
                {
                    return response;
                }
                
            }
            catch (Exception ex)
            {
                footer = GenerateFooterFromException(ex);
            }
            return response;
        }

        private IstihbaratCevap GetIntelligenceDispatch(IstihbaratTalep serviceRequest)
        {
            var client = new SOkulTahsilatMobilSahaSatisClient();
            try
            {
                return client.IstihbaratYap(serviceRequest);
            }
            finally
            {
                client.CloseAndCleanUp();
            }
        }

        private void MapServiceResponse(IstihbaratCevap serviceResponse, GetIntelligenceForSchoolPaymentResponse response)
        {
            response.HasMobilePhone = serviceResponse.CepTelefonuVarmi;
            response.IsSuitableForGuarantor = serviceResponse.GarantorlukUygunluk;
            response.AccountStatusResult = serviceResponse.HesapDurumuSonucu;
            response.Status = serviceResponse.IstihbaratDurumu;
            response.Result = serviceResponse.IstihbaratSonucu;
            response.IsOccupationSuitable = serviceResponse.MeslekUygunMu;
            response.IsPaymentPerformanceSuitable = serviceResponse.OdemePerformansiUygunMu;
            response.IsPersonel = serviceResponse.PersonelMi;
            response.HasAvailableAccount = serviceResponse.UygunHesapVarmi;
            response.HasEmail = serviceResponse.EPostaVarmi;
            response.AccountList = serviceResponse.HesapListesi == null ? new List<string>() : new List<string>(serviceResponse.HesapListesi);

        }
    }
}
