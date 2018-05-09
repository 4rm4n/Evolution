using System;
using VakifBank.DSA.YHB.MobileApi.Adapters.Providers;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;
using VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis;
using VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatisServiceReference;
using VeriPark.MobileApi.Contracts;

namespace VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatis
{
    public class GetStudentInformationOperation : BaseAdapterOperation, IFetchAdaptorOperation<GetStudentInformationRequest, GetStudentInformationResponse>
    {
        public GetStudentInformationResponse Dispatch(Header header, GetStudentInformationRequest request, out Footer footer)
        {
            var response = new GetStudentInformationResponse();
            try
            {
                var serviceRequest = SOkulTahsilatMobilSahaSatisServiceProvider.GenerateRequest<OgrenciBilgiTalep>(header);
                serviceRequest.OgrenciTCKimlikNo = request.IdentityNo;
                var serviceResponse = Loggers.Performance.ExecuteMeasure(() => GetStudentInformationDispatch(serviceRequest));
                footer = SOkulTahsilatMobilSahaSatisServiceProvider.ConstructFooter(serviceResponse);
                if (!footer.IsSuccess)
                {
                    return response;
                }
                MapServiceResponse(serviceResponse, response);
            }
            catch (Exception ex)
            {
                footer = GenerateFooterFromException(ex);
            }
            return response;
        }

        private OgrenciBilgiCevap GetStudentInformationDispatch(OgrenciBilgiTalep serviceRequest)
        {
            var client = new SOkulTahsilatMobilSahaSatisClient();
            try
            {
                return client.BulOgrenciBilgi(serviceRequest);
            }
            finally
            {
                client.CloseAndCleanUp();
            }
        }

        private void MapServiceResponse(OgrenciBilgiCevap serviceResponse, GetStudentInformationResponse response)
        {
            response.StudentFullName = serviceResponse.OgrenciAdSoyad;
            response.IsProblematic = serviceResponse.SakıncalıMi;
            response.IsRestricted = serviceResponse.KisitliMi;
        }
    }
}
