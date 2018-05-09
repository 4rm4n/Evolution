using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VakifBank.DSA.YHB.MobileApi.Adapters.Providers;
using VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatisServiceReference;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;
using VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis;
using VeriPark.MobileApi.Contracts;

namespace VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatis
{
    public class CreatePhysicalDocumentOperation : BaseAdapterOperation, IFetchAdaptorOperation<CreatePhysicalDocumentRequest, CreatePhysicalDocumentResponse>
    {
        public CreatePhysicalDocumentResponse Dispatch(Header header, CreatePhysicalDocumentRequest request, out Footer footer)
        {
            var response = new CreatePhysicalDocumentResponse();
            try
            {
                var serviceRequest = SOkulTahsilatMobilSahaSatisServiceProvider.GenerateRequest<DokumanOlusturTalep>(header);

                OkulTahsilatiTaksit[] okulTahsilatıTaksitler = null;

                if (request.SchoolPayments != null)
                {
                    okulTahsilatıTaksitler = new OkulTahsilatiTaksit[request.SchoolPayments.Count];
                    for (var index = 0; index < request.SchoolPayments.Count; index++)
                    {
                        var current = request.SchoolPayments[index];
                        okulTahsilatıTaksitler[index] = new OkulTahsilatiTaksit
                        {
                            OdemeTarihi = current.Date,
                            OdemeTipi = current.PaymentType,
                            PesinatTaksit = current.IsDownPayment ? 0 : 1,
                            TaksitSirasi = current.Order,
                            TaksitTutari = current.Amount
                        };
                    }
                }

                serviceRequest.OkulTahsilatiTaksitler = okulTahsilatıTaksitler;
                serviceRequest.HesapNo = request.AccountNumber;
                serviceRequest.EgitimDonemi = request.EducationPeriod;
                serviceRequest.IstihbaratDurumu = request.IntelligenceStatus;
                serviceRequest.IstihbaratSonucu = request.IntelligenceResult;
                serviceRequest.KrediLimitiVer = request.GiveCreditLimit;
                serviceRequest.OgrenciAdi = request.StudentFirstName;
                serviceRequest.OgrenciNo = request.StudentNumber;
                serviceRequest.OgrenciSoyadi = request.StudentLastName;
                serviceRequest.OgrenciTcKimlikNo = request.StudentIdentityNumber;
                serviceRequest.OkulTanimId = request.SchoolDefinitionId;
                serviceRequest.OkulTuru = request.SchoolType;
                serviceRequest.TahsilatOdemeTanimId = request.PaymentDefinitionId;
                serviceRequest.VeliAdi = request.GuardianFirstName;
                serviceRequest.VelisiKendisi = request.IsGuardian;
                serviceRequest.VeliSoyadi = request.GuardianLastName;
                serviceRequest.VeliTcKimlikNo = request.GuardianIdentityNumber;

                var serviceResponse = Loggers.Performance.ExecuteMeasure(() => CreatePhysicalDocumentDispatch(serviceRequest));
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

        private DokumanOlusturCevap CreatePhysicalDocumentDispatch(DokumanOlusturTalep serviceRequest)
        {
            var client = new SOkulTahsilatMobilSahaSatisClient();
            try
            {
                return client.OlusturFizikselDokuman(serviceRequest);
            }
            finally
            {
                client.CloseAndCleanUp();
            }
        }
    }
}
