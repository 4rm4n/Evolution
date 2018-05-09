using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis.Entities
{
    public class School
    {
        public long SchoolDefinitionId { get; set; } // OkulTanimId
        public long PaymentDefinitionId { get; set; } // TahsilatOdemeTanimid
        public string SchoolGroupName { get; set; } // Okul Adı 
        public int SchoolType { get; set; } // Okul Türü
        public int PaymentType { get; set; } // Ödeme Tipi
        public DateTime AgreementStartDate { get; set; } // Protokol Başlangıç Tarihi
        public DateTime AgreementEndDate { get; set; } // Protokol Bitiş Tarihi
        public string EducationPeriod { get; set; } // Eğitim Dönemi
        public DateTime GuarantorStartDate { get; set; } // Garantor Başlangıç Tarihi
        public DateTime GuarantorEndDate { get; set; } // Garantor Bitiş Tarihi
        public decimal InstallmentAmount { get; set; } // Taksit tutarı
        public int InstallmentCount { get; set; } // Taksit sayısı
        public bool IsGuarantorMandatory { get; set; } // GarantorlukZorunluMu


    }
}
