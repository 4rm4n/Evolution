using System;
using System.Linq;
using VakifBank.DSA.YHB.MobileApi.Adapters.Providers;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;
using VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis;
using VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatisServiceReference;
using VeriPark.MobileApi.Contracts;
using System.Collections.Generic;

namespace VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatis
{
    public class GetSchoolGroupOperation : BaseGetirOkulAdapter<GetSchoolGroupRequest, GetSchoolGroupResponse>
    {
        protected override void MapServiceResponse(OkulBilgisiCevap serviceResponse, GetSchoolGroupResponse response, GetSchoolGroupRequest request)
        {
            if (serviceResponse.OkulBilgileri == null)
            {
                response.SchoolGroups = new List<string>();
            }
            else
            {
                response.SchoolGroups = serviceResponse.OkulBilgileri.Select(o => o.OkulAdi).Distinct().ToList();
            }
        }
    }
}
