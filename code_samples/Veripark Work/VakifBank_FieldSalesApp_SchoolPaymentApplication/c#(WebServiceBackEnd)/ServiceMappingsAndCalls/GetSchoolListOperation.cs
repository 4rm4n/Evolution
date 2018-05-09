using System.Linq;
using VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis;
using VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatisServiceReference;
using VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis.Entities;

namespace VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatis
{
    public class GetSchoolListOperation : BaseGetirOkulAdapter<GetSchoolListRequest, GetSchoolListResponse>
    {
        protected override void MapServiceResponse(OkulBilgisiCevap serviceResponse, GetSchoolListResponse response, GetSchoolListRequest request)
        {
            if (serviceResponse.OkulBilgileri == null)
            {
                response.Schools = new System.Collections.Generic.List<School>();
            }
            else
            {
                response.Schools = (from okul in serviceResponse.OkulBilgileri
                                    where okul.OkulAdi.Equals(request.SchoolGroupName)
                                    select new School
                                    {
                                        SchoolDefinitionId = okul.OkulTanimId,
                                        PaymentDefinitionId = okul.TahsilatOdemeTanimId,
                                        SchoolGroupName = okul.OkulAdi,
                                        SchoolType = okul.OkulTuru,
                                        PaymentType = okul.OdemeTipi,
                                        AgreementStartDate = okul.ProtokolBaslangicTarihi,
                                        AgreementEndDate = okul.ProtokolBitisTarihi,
                                        EducationPeriod = okul.EgitimDonemi,
                                        GuarantorStartDate = okul.GarantorBaslangicTarihi,
                                        GuarantorEndDate = okul.GarantorBitisTarihi,
                                        InstallmentAmount = okul.TaksitTutari,
                                        InstallmentCount = okul.TaksitSayisi,
                                        IsGuarantorMandatory = (okul.GarantorlukZorunluMu == 1 ? true : false)
                                    }).ToList();
            }
        }
    }
}
