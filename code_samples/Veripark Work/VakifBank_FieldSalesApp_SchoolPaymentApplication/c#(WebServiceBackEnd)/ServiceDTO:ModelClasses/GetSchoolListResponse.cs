using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;
using VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis.Entities;

namespace VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis
{
    public class GetSchoolListResponse : IResponseData
    {
        public List<School> Schools { get; set; }
    }
}
