using System;
using VakifBank.DSA.YHB.MobileApi.Adapters.Providers;
using VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatisServiceReference;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;
using VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis;
using VeriPark.MobileApi.Contracts;

namespace VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatis
{
    public class CheckStudentDefinitionOperation : BaseAdapterOperation, IFetchAdaptorOperation<CheckStudentDefinitionRequest, CheckStudentDefinitionResponse>
    {
        public CheckStudentDefinitionResponse Dispatch(Header header, CheckStudentDefinitionRequest request, out Footer footer)
        {
            var response = new CheckStudentDefinitionResponse();
            try
            {
                var serviceRequest = SOkulTahsilatMobilSahaSatisServiceProvider.GenerateRequest<OgrenciTanimTalep>(header);
                MapServiceRequest(serviceRequest, request);
                var serviceResponse = Loggers.Performance.ExecuteMeasure(() => CheckStudentDefinitionDispatch(serviceRequest));
                footer = SOkulTahsilatMobilSahaSatisServiceProvider.ConstructFooter(serviceResponse);
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

        private OgrenciTanimCevap CheckStudentDefinitionDispatch(OgrenciTanimTalep serviceRequest)
        {
            var client = new SOkulTahsilatMobilSahaSatisClient();
            try
            {
                return client.KontrolEtOgrenciTanim(serviceRequest);
            }
            finally
            {
                client.CloseAndCleanUp();
            }
        }

        private void MapServiceRequest(OgrenciTanimTalep serviceRequest, CheckStudentDefinitionRequest request)
        {
            serviceRequest.OkulTanimId = request.SchoolDefinitionId;
            serviceRequest.OkulAdi = request.SchoolGroupName;
            serviceRequest.OkulTuru = request.SchoolType;
            serviceRequest.EgitimDonemi = request.EducationPeriod;
            serviceRequest.VeliKendisi = request.IsGuardian;
            serviceRequest.TcKimlikNo = request.IdentityNo;
            serviceRequest.OgrenciNo = request.StudentNo;
            serviceRequest.OgrenciTCKimlikNo = request.StudentIdentityNo;
            serviceRequest.Hesap = request.Account;
            serviceRequest.KrediLimitiVer = request.GiveCreditLimit;        
    }

    }
}
