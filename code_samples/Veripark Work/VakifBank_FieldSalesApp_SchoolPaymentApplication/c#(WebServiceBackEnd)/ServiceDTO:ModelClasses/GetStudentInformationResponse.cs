using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;

namespace VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis
{
    public class GetStudentInformationResponse : IResponseData
    {
        public string StudentFullName { get; set; } // OgrenciAdSoyad
        public bool IsProblematic { get; set; } // SakıncalıMi
        public bool IsRestricted { get; set; } // KısıtlıMi
    }
}
