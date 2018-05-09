using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;

namespace VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis
{
    public class CheckStudentDefinitionRequest : IRequestData
    {
        public long SchoolDefinitionId { get; set; } // OkulTanimId
        public string SchoolGroupName { get; set; } // Okul Adı
        public int SchoolType { get; set; } // Okul Türü
        public string EducationPeriod { get; set; } // Eğitim Dönemi
        public bool IsGuardian { get; set; } // VeliKendisi
        public string IdentityNo { get; set; } // TcKimlikNo
        public string StudentNo { get; set; } // Ogrenci No
        public string StudentIdentityNo { get; set; } // OgrenciTCKimlikNo
        public string Account { get; set; } // Hesap
        public bool GiveCreditLimit { get; set; } // KrediLimitiVer

    }
}
